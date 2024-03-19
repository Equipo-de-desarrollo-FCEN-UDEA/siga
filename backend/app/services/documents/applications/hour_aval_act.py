from datetime import datetime
from io import BytesIO
from uuid import uuid1

from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

from ..templates import templates_dir
from app.domain.schemas import UserResponse, HourAvalInDB, Act
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.core.celery_worker import celery_app
from app.assets.logos import logos_dir
from app.services import aws, crud

log = get_logging(__name__)

settings = get_app_settings()


def hour_aval_act_generation(user: UserResponse, hour_aval: HourAvalInDB, act: Act, users: list[dict], backres: list[dict], template: str) -> None:

    path = f'user_{user.id}/{uuid1()}' + 'acta-instituto.pdf'

    data = {
        "image": f"logo_{user.department.school_id}.png",
        "signature": f"signature_department_{user.department.id}.png",
        "date": act.date.strftime("%A %d de %B del %Y"),
        "user": user.dict(),
        'hour_aval': hour_aval.dict(exclude={'id'}),
        'act': act.act,
        'users': users,
        'backrest': backres
    }
    hour_aval_act_pdf_to_aws.apply_async(args=(data, path, template))

    return path


@celery_app.task
def hour_aval_act_pdf_to_aws(data: dict, path: str, template_html: str):
    env = Environment(loader=FileSystemLoader(templates_dir))
    template = env.get_template(template_html)
    render = template.render(data)
    pdf = HTML(string=render, base_url=logos_dir).write_pdf()
    file = BytesIO()
    file.write(pdf)
    file.seek(0)

    aws.s3.push_data_to_s3_bucket(settings.aws_bucket_name, file,
                                  file_name=path, content_type='application/pdf')
