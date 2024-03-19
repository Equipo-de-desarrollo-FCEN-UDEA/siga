from datetime import datetime
from io import BytesIO
from uuid import uuid1

from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

from ..templates import templates_dir
from app.domain.models import User
from app.domain.schemas import UserResponse, HourAvalInDB
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.core.celery_worker import celery_app
from app.assets.logos import logos_dir
from app.services import aws

log = get_logging(__name__)

settings = get_app_settings()


def hour_aval_letter_generation(user: User, hour_aval: HourAvalInDB, users=list[dict]) -> str:

    user_response = UserResponse.from_orm(user)
    path = f'user_{user.id}/{uuid1()}' + 'aval-horas.pdf'
    data = {
        'image': f"logo_{user.department.school_id}.png",
        'date': datetime.now().strftime("%A %d de %B del %Y"),
        'user': user_response.dict(),
        'hour_aval': hour_aval.dict(exclude_none=False, exclude={'id'}),
        'users': users
    }

    generate_hour_aval_letter_pdf_to_aws.apply_async(args=(data, path))
    
    return path

@celery_app.task
def generate_hour_aval_letter_pdf_to_aws(data: dict, path: str):
    env = Environment(loader=FileSystemLoader(templates_dir))
    template = env.get_template('houraval.letter.html.j2')
    render = template.render(data)
    pdf = HTML(string=render, base_url=logos_dir).write_pdf()
    file = BytesIO()
    file.write(pdf)
    file.seek(0)

    aws.s3.push_data_to_s3_bucket(settings.aws_bucket_name, file,
                              file_name=path, content_type='application/pdf')