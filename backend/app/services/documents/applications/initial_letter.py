from datetime import datetime
from io import BytesIO
from uuid import uuid1

from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

from ..templates import templates_dir
from app.domain.models import User
from app.domain.schemas import UserResponse
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.core.celery_worker import celery_app
from app.assets.logos import logos_dir
from app.services import aws

log = get_logging(__name__)

settings = get_app_settings()

async def initial_letter_generation(user: User, body: str) -> str:

    user_response = UserResponse.from_orm(user)

    path = f'user_{user.id}/{uuid1()}' + 'carta-inicio.pdf'

    data = {
        "image": f"logo_{user.department.school_id}.png",
        "date": datetime.now().strftime("%A %d de %B del %Y"),
        "user": user_response.dict(),
        'body': body
    }

    generate_initial_letter_pdf_to_aws.apply_async(args=(data, path), serializer='json')
    
    return path

@celery_app.task
def generate_initial_letter_pdf_to_aws(data: dict, path: str):
    env = Environment(loader=FileSystemLoader(templates_dir))
    template = env.get_template('initial.letter.html.j2')
    render = template.render(data)
    pdf = HTML(string=render, base_url=logos_dir).write_pdf()
    file = BytesIO()
    file.write(pdf)
    file.seek(0)

    aws.s3.push_data_to_s3_bucket(settings.aws_bucket_name, file,
                              file_name=path, content_type='application/pdf')