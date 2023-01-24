import smtplib
from typing import Dict, Any

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from ..templates import templatesdir
from app.core.celery_worker import celery_app
from app.core.config import get_app_settings

settings = get_app_settings()

env = Environment(loader=FileSystemLoader(templatesdir))

@celery_app.task
def hours_aval_email(aval: Dict[str, Any], applicant: Dict[str, Any], email: str, id: str, token: str):
    template = env.get_template("email.confirmacion.aval.html.j2")
    link = f'http://{settings.APP_DOMAIN}/confirmaciones/{id}/aval-horas/{token}/'
    context = {
        'applicant': applicant,
        'aval': aval,
        'link_accept': link + str(1),
        'link_decline': link + str(0)
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Confirmación aval de horas para grupos de investigación"
    msg["From"] = settings.smtp_user_email
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(settings.smtp_user_email, settings.smtp_user_password._secret_value)
        smtp.send_message(msg)
