# from datetime import datetime
# import time
# import json
# from app.services.emails.cron_notifications.full_time_notification import full_time_report


# from app.core.logging import get_logging


# log = get_logging(__name__)

# @celery.task(name='app.core.tasks.full_time_notifications')
# def full_time_notifications(tipo_solicitud: str, send_date: datetime,  id: int, email: str):
#     time.sleep(5)
#     log.info("I am suppose to run")
#     respon = full_time_report(
#         tipo_solicitud=tipo_solicitud, send_date=send_date, id=id, email=email)
#     json_object = json.dumps(dict(respon), indent=4)
#     return json_object


from app.services import crud
from app.domain.models.cron_job import CronJob
from app.core.celery_worker import celery_app
from app.db.session import SessionLocal
from app.services.emails.cron_notifications.full_time import notifications

from app.core.logging import get_logging

log = get_logging(__name__)


@celery_app.task(name='app.core.tasks.full_time_notifications')
def full_time_notifications():
    database = SessionLocal()
    # time.sleep(5)
    log.info("RUNNING TASKKKKS")
    try: 
        emails_to_send = crud.cron_job.get_multi(db=database)
    except:
        print("No dio")
    log.debug('emails_to_send', emails_to_send[-1].send_date)
    
    notifications()
    database.close()
