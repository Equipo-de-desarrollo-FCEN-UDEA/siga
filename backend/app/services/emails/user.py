import smtplib
from typing import Dict, Any

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from .templates import templatesdir
from app.core.celery_worker import celery
from app.domain.models import User


env = Environment(loader=FileSystemLoader(templatesdir))


@celery.task
def recovery_password_email(to: str, email: str, token: str):
    template = env.get_template('user.recovery.password.html')
    render = template.render({
        "user": {"names": to},
        "token": token
    })
    msg = EmailMessage()
    msg["Subject"] = "Recuperación de contraseña"
    msg["From"] = "aplicacioncomisionesfcen@udea.edu.co"
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login("aplicacioncomisionesfcen@udea.edu.co", "gstyjqgrmvbglbqh")
        smtp.send_message(msg)

@celery.task
def confirm_email(to: str, email: str, token: str):
    template = env.get_template('user.new.account.html')
    render = template.render({
        "user": {"names": to},
        "token": token
    })
    msg = EmailMessage()
    msg["Subject"] = "Recuperación de contraseña"
    msg["From"] = "aplicacioncomisionesfcen@udea.edu.co"
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login("aplicacioncomisionesfcen@udea.edu.co", "gstyjqgrmvbglbqh")
        smtp.send_message(msg)
