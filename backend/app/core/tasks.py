
from datetime import datetime

from app.services import crud
from app.core.celery_worker import celery_app
from app.db.session import SessionLocal
from app.services.emails.cron_notifications.full_time import notifications

from app.core.logging import get_logging

log = get_logging(__name__)


@celery_app.task(name='app.core.tasks.full_time_notifications')
def full_time_notifications():

    # Conecta a BD
    database = SessionLocal()

    log.info("RUNNING TASKKKKS")

    today = datetime.today()

    # Obtiene todos los mensajes del dia (today)
    crons = crud.cron_job.get_multi(db=database, today = datetime.today())

    # Obtiene todos los correos que se deben enviar 
    emails_to_send = [cron.user_email for cron in crons]

    log.debug('crons', crons)
    log.debug('emails_to_send', emails_to_send)

    # Si hay emails para enviar hoy, se llama la función que crea las noticaciones
    if emails_to_send:
        notifications(emails_to_send, today)

    database.close()
