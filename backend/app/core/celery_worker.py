from __future__ import absolute_import

from celery import Celery
from celery.schedules import crontab


from app.core.logging import get_logging
from app.core.config import get_app_settings

log = get_logging(__name__)

settings = get_app_settings()


include = [
    "app.services.emails",

    "app.services.documents.applications.commission",
    "app.services.documents.applications.permission",
    "app.services.emails.application",
    "app.services.emails.applications.commission",
    "app.core.tasks"
]

celery_app = Celery('tasks', broker=settings.redis_uri,
                backend=settings.redis_uri, include=include)

celery_app.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"],
)

celery_app.conf.task_routes = {
    "app.core.tasks.full_time_notifications": "test-queue"
}


celery_app.conf.beat_schedule = {
        'notifications': {
        'task': 'app.core.tasks.full_time_notifications',
        'schedule': crontab(hour=5, minute=0),
    }
}

celery_app.conf.update(task_track_started=True)