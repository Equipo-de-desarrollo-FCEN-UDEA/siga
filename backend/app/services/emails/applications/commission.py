import smtplib

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from ..templates import templatesdir
from app.core.celery_worker import celery
from app.core.config import get_app_settings

settings = get_app_settings()

env = Environment(loader=FileSystemLoader(templatesdir))

@celery.task
def acomplish_email(to_name: str, to_lname: str, acompl: z, token: str, email: str):
    template = env.get_template("email.envio.cumplido.html")

    context = {
    'user':{'nombre':to_name, 'apellido':to_lname},
    'cumplido':acompl,
    'Enlace':token
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Envío de cumplido"
    msg["From"] = settings.smtp_from_email
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(settings.smtp_user_email, settings.smtp_user_password)
        smtp.send_message(msg)