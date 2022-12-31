from __future__ import absolute_import

from celery import Celery
from celery.schedules import crontab
# from app.services.emails.cron_notifications.full_time import notifications


from app.core.logging import get_logging
from app.core.config import get_app_settings

log = get_logging(__name__)

settings = get_app_settings()

# include = [
#     "app.services.emails.user",
#     "app.services.documents.applications.commission",
#     "app.services.documents.applications.permission",
#     "app.services.emails.application",
#     "app.services.emails.applications.commission",
#     #"app.services.emails.cron_notifications.full_time.notifications"
# ]

# celery = Celery('tasks', broker=settings.redis_uri,
#                 backend=settings.redis_uri, include=include)

# celery.conf.update(
#     task_serializer="json",
#     result_serializer="json",
#     accept_content=["json"],
# )

# celery.conf.update(timezone='UTC')

# celery.conf.task_routes = {
#     "app.services.emails.cron_notifications.full_time.notifications": "test-queue"
# }

# Celery Beat Settings
# celery.conf.beat_schedule = {
#     'notifications': {
#         'task': 'app.services.emails.cron_notifications.full_time.notifications',
#         'schedule': crontab(minute="*/1"),
#         #'args': (2,)
#     }
# }

# celery.conf.update(task_track_started=True)
#celery.autodiscover_tasks()


# @celery.task(bind=True)
# def debug_task(self):
#     print(f'Request: {self.request!r}')


# database = Depends(db.get_db)

# celery.conf.beat_schedule = {
#     'notifications': {
#         'task': 'notifications',
#         'schedule': crontab(minute="*/1"),
#         #'args': (2,)
#     }
# }


# @shared_task(bind=True)
# @celery.task()
# def notifications():
#     log.info('just ran')

#     cron_jobs = crud.cron_job.get_multi(db=database)
#     log.debug('cron_jobs', cron_jobs)


# -----------------


# include = [
#     "app.services.emails.user",
#     "app.services.documents.applications.commission",
#     "app.services.documents.applications.permission",
#     "app.services.emails.application",
#     "app.services.emails.applications.commission",
#     "app.services.emails.cron_notifications.full_time"
# ]

# celery_app = Celery('tasks', broker=settings.redis_uri,
#                 backend=settings.redis_uri, include=include)

# celery_app.conf.update(
#     task_serializer="json",
#     result_serializer="json",
#     accept_content=["json"],
# )

# celery_app.conf.beat_schedule = {
#     'notifications': {
#         'task': 'app.services.emails.cron_notifications.full_time.notifications',
#         'schedule': crontab(minute="*/1"),
#     }
# }

# celery_app.conf.update(task_track_started=True)


# ----------------------
include = [
    "app.services.emails.user",
    "app.services.documents.applications.commission",
    "app.services.documents.applications.permission",
    "app.services.emails.application",
    "app.services.emails.applications.commission",
    "app.services.emails.cron_notifications.full_time"
]

celery_app = Celery('tasks', broker=settings.redis_uri,
                backend=settings.redis_uri, include=include)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
)

celery_app.conf.task_routes = {
    "app.services.emails.cron_notifications.full_time.notifications": "test-queue"
}


celery_app.conf.beat_schedule = {
    'notifications': {
        'task': 'app.services.emails.cron_notifications.full_time.notifications',
        'schedule': crontab(minute="*/1"),
    }
}

celery_app.conf.update(task_track_started=True)