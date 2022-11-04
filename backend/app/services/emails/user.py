import smtplib

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from .templates import templatesdir
from app.celery_worker import celery


env = Environment(loader=FileSystemLoader(templatesdir))

@celery.task
def recovery_password_email(to:str, subject:str):
    template = env.get_template('user.recovery.password.html')
    render = template.render({
        "user": {"names":'Simón'},
        "token":"Token"
    })
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = "aplicacioncomisionesfcen@udea.edu.co"
    msg["To"] = to
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login("aplicacioncomisionesfcen@udea.edu.co", "gstyjqgrmvbglbqh")
        smtp.send_message(msg)