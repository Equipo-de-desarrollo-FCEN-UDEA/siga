import smtplib
from typing import Dict, Any

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from ..templates import templatesdir
from app.core.celery_worker import celery_app
from app.core.config import get_app_settings

from app.services.aws import s3

settings = get_app_settings()

env = Environment(loader=FileSystemLoader(templatesdir))


@celery_app.task
def compliment_email(to_name: str, to_lname: str, observation: str, files: list[Dict[str, Any]], email: list[str]):
    template = env.get_template("email.envio.cumplido.html.j2")

    context = {
        'user': {'name': to_name, 'last_name': to_lname},
        'observation': observation
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Envío de cumplido"
    msg["From"] = settings.smtp_user_email
    msg["To"] = ', '.join(email)
    msg.set_content(
        render,
        subtype="html"
    )

    for jfile in files:
        # Buscar en el JSON el path al documento y usar S3 para traer el contenido.
        obj = s3.get_data_from_s3_bucket(
            settings.aws_bucket_name, jfile['path'])
        # La información del archivo está dentro del objeto.
        subtype = obj['ContentType']
        content = obj['Body'].read()
        msg.add_attachment(content,
                           maintype='content',
                           subtype=subtype,
                           filename=jfile['name'])

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(settings.smtp_user_email, settings.smtp_user_password._secret_value)
        smtp.send_message(msg)
