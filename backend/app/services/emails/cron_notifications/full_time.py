import smtplib
from datetime import datetime
from dateutil.relativedelta import relativedelta
# from time import sleep

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage
from ..templates import templatesdir

from celery import shared_task
from app.core.celery_worker import celery_app


from app.core.config import get_app_settings
from app.core.logging import get_logging

log = get_logging(__name__)
settings = get_app_settings()

# Variables para el remitente del correo.
_my_email = settings.smtp_user_email
_my_pwd = settings.smtp_user_password._secret_value

env = Environment(loader=FileSystemLoader(templatesdir))



# -----------------------

@shared_task(bind=True)
@celery_app.task(acks_late=True, queue="test-queue")
def notifications(emails: list, today: datetime)-> str:
    print("Task started")
    log.info("celeryyyyyyyyy")

    template = env.get_template("email.report.full.time.html.j2")
    url = f"http://{settings.APP_DOMAIN}/solicitudes"
    context = {
        'date': today.date() + relativedelta(months=1),
        'link': url
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Informe | Dedicación exclusiva"
    msg["From"] = _my_email
    msg["To"] = emails
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)


    return {
        "message": "Hello world!!!"
    }
    

