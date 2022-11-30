from datetime import datetime
from io import BytesIO
from uuid import uuid1

from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML
from odmantic import ObjectId
from odmantic.session import AIOSession

from ..templates import templates_dir
from app.domain.models import User, Application, Consecutive
from app.domain.schemas import CommissionDocument, UserResponse, ApplicationResponse, SchoolInDB
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.core.celery_worker import celery
from app.assets.logos import logos_dir
from app.services import aws, crud

log = get_logging(__name__)

settings = get_app_settings()

async def commission_resolution_generation(user: User, application: Application, mong_db: AIOSession) -> None:

    id = ObjectId(application.mongo_id)

    application = ApplicationResponse.from_orm(application)

    school = SchoolInDB.from_orm(user.department.school)

    user = UserResponse.from_orm(user)

    commission = await crud.comission.get(mong_db, id=id,)

    path = f'user_{user.id}/{uuid1()}' + 'resolucion.pdf'

    commission.resolution = path

    await mong_db.save(commission)

    commission = CommissionDocument(**commission.__dict__)

    consecutive_list = await mong_db.find(Consecutive)

    consecutive: Consecutive = consecutive_list[0] if consecutive_list else Consecutive(number=10000)

    data = {
        "image": f"logo_{user.department.school_id}.png",
        "signature": f"signature_{user.department.school_id}.png",
        "date": datetime.now().strftime("%A %d de %B del %Y"),
        "user": user.dict(),
        "school": school.dict(),
        "commission": commission.dict(),
        "application": application.dict(),
        "consecutive": str(consecutive.number)[1:]
    }

    consecutive.number += 1 

    await mong_db.save(consecutive)

    generate_commission_pdf_to_aws.apply_async(args=(data, path), serializer='json')

    
    return None

@celery.task
def generate_commission_pdf_to_aws(data: dict, path: str):
    env = Environment(loader=FileSystemLoader(templates_dir))
    template = env.get_template('commission.letter.html')
    render = template.render(data)
    pdf = HTML(string=render, base_url=logos_dir).write_pdf()
    file = BytesIO()
    file.write(pdf)
    file.seek(0)

    aws.s3.push_data_to_s3_bucket(settings.aws_bucket_name, file,
                              file_name=path, content_type='application/pdf')