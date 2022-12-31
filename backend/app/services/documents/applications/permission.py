from datetime import datetime
from io import BytesIO
from uuid import uuid1

from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
from odmantic import ObjectId
from odmantic.session import AIOSession

from ..templates import templates_dir
from app.domain.models import Commission, User, Application
from app.domain.schemas import PermissionDocument, UserResponse, ApplicationResponse, SchoolInDB
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.core.celery_worker import celery_app
from app.assets.logos import logos_dir
from app.services import aws, crud

log = get_logging(__name__)

settings = get_app_settings()

async def permission_resolution_generation(user: User, application: Application, mong_db: AIOSession) -> None:

    id = ObjectId(application.mongo_id)

    application = ApplicationResponse.from_orm(application)

    school = SchoolInDB.from_orm(user.department.school)

    user = UserResponse.from_orm(user)

    permission = await crud.permission.get(mong_db, id=id,)

    path = f'user_{user.id}/{uuid1()}' + 'resolucion.pdf'

    permission.resolution = path

    await mong_db.save(permission)

    permission = PermissionDocument(**permission.__dict__)

    data = {
        "image": f"logo_{user.department.school_id}.png",
        "signature": f"signature_{user.department.school_id}.png",
        "date": datetime.now().strftime("%A %d de %B del %Y"),
        "user": user.dict(),
        "school": school.dict(),
        "permission": permission.dict(),
        "application": application.dict()
    }

    generate_permission_pdf_to_aws.apply_async(args=(data, path), serializer='json')

    
    return None

@celery_app.task
def generate_permission_pdf_to_aws(data: dict, path: str):
    env = Environment(loader=FileSystemLoader(templates_dir))
    template = env.get_template('permission.letter.html')
    render = template.render(data)
    pdf = HTML(string=render, base_url=logos_dir).write_pdf()
    file = BytesIO()
    file.write(pdf)
    file.seek(0)

    aws.s3.push_data_to_s3_bucket(settings.aws_bucket_name, file,
                              file_name=path, content_type='application/pdf')