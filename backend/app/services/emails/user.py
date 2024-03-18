import smtplib

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from .templates import templatesdir
from app.core.celery_worker import celery_app
from app.core.config import get_app_settings
from app.core.logging import get_logging

settings = get_app_settings() 

log = get_logging(__name__)

#Variables para el remitente del correo.
_my_email = settings.smtp_user_email
_my_pwd = settings.smtp_user_password._secret_value

env = Environment(loader=FileSystemLoader(templatesdir))

@celery_app.task
def recovery_password_email(to_name: str, token: str, email: str):
    template = env.get_template('email.recuperar.contraseña.html.j2')
    link = f"http://{settings.APP_DOMAIN}/auth/recuperar-contrasena/{token}"
    context = {
    'user':{'nombre':to_name.title()},
    'enlace': link
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Recuperación de contraseña"
    msg["From"] = _my_email
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)

        # server de pruebas udea

    # with smtplib.SMTP("172.19.0.101", port=25) as smtp:
    #     smtp.send_message(msg=msg, from_addr=_my_email, to_addrs= email)


@celery_app.task
def confirm_email(to_name: str, token: str, email: str):
    template = env.get_template('email.validar.email.html.j2')
    link = f"http://{settings.APP_DOMAIN}/auth/confirmar-correo/{token}"
    context = {
    'user':{'nombre':to_name.title()},
    'enlace': link
    }


    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Confirmación correo"
    msg["From"] = _my_email
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)

        # server de pruebas udea

    # with smtplib.SMTP("172.19.0.101", port=25) as smtp:
    #    smtp.send_message(msg=msg, from_addr=_my_email, to_addrs= email)
