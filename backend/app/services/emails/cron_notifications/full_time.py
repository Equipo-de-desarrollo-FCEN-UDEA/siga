import smtplib
from datetime import datetime

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from ..templates import templatesdir
from celery.schedules import crontab
from app.core.celery_worker import celery
from app.core.config import get_app_settings
from fastapi import Depends
from app.api.middlewares import db

from app.services import crud

from sqlalchemy.orm import Session

from app.core.logging import get_logging

log = get_logging(__name__)
settings = get_app_settings()

# Variables para el remitente del correo.
_my_email = settings.smtp_user_email
_my_pwd = settings.smtp_user_password._secret_value

env = Environment(loader=FileSystemLoader(templatesdir))

database = Depends(db.get_db)

@celery.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):

    # cron_jobs = crud.cron_job.get_multi(db=db)

    # log.debug('cron_jobs', cron_jobs)

    # Calls test('world') every 30 seconds
    # sender.add_periodic_task(30.0, notifications.s(db=db, tipo_solicitud=tipo_solicitud,
    #                          date=date, id=id, email=email, template=template, subject=subject), expires=10)

    sender.add_periodic_task(30.0, notifications.s(db=database), expires=10)

    # Executes every Monday morning at 7:30 am
    # sender.add_periodic_task(
    #     crontab(hour=7, minute=30, day_of_week=1),
    #     notifications.s(db=database),
    # )


@celery.task(bind=True)
#def notifications(db: Session, tipo_solicitud: str, date: datetime, id: int, email: str, template: str, subject: str):
def notifications(db: Session):
   
    cron_jobs = crud.cron_job.get_multi(db=db)
    log.debug('cron_jobs', cron_jobs)

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
