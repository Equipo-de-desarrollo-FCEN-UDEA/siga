# import smtplib
# from datetime import datetime
# from time import sleep

# from jinja2 import Environment, FileSystemLoader
# from email.message import EmailMessage
# from ..templates import templatesdir

# from celery.schedules import crontab
from celery import shared_task
# from celery import current_task
from app.core.celery_worker import celery_app


# from sqlalchemy.orm import Session

# from app.core.config import get_app_settings
from app.core.logging import get_logging

log = get_logging(__name__)
# settings = get_app_settings()

# Variables para el remitente del correo.
# _my_email = settings.smtp_user_email
# _my_pwd = settings.smtp_user_password._secret_value

# env = Environment(loader=FileSystemLoader(templatesdir))




# -----------------------

@shared_task(bind=True)
@celery_app.task(acks_late=True, queue="test-queue")
def notifications()-> str:
    print("Task started")
    log.info("celeryyyyyyyyy")


    return {
        "message": "Hello world!!!"
    }
    

# -----------------------


# @celery_app.task(acks_late=True, queue="test-queue")
# def notifications2()-> str:
#     print("Task started 2222")
#     return "done"

# @celery_app.on_after_configure.connect
# def setup_periodic_tasks(sender, **kwargs):
#     sender.add_periodic_task(30.0, notifications2.s(), name='add every 30')





    # template = env.get_template(template)
    # url = f"http://{settings.APP_DOMAIN}/solicitudes/ver/{id}/{tipo_solicitud.lower()}"
    # context = {
    #     'date': date,
    #     'link': url
    # }

    # render = template.render(context)
    # msg = EmailMessage()
    # msg["Subject"] = subject
    # msg["From"] = _my_email
    # msg["To"] = email
    # msg.set_content(
    #     render,
    #     subtype="html"
    # )

    # with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
    #     smtp.login(_my_email, _my_pwd)
    #     smtp.send_message(msg)
