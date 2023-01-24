from time import sleep

from celery import Celery

from app.core.config import get_app_settings

settings = get_app_settings()

include = [
    "app.services.emails.user",
    "app.services.documents.applications.commission",
    "app.services.documents.applications.permission",
    "app.services.emails.application",
    "app.services.emails.applications.commission"
]

celery = Celery('tasks', broker=settings.redis_uri,
                backend=settings.redis_uri, include=include)

celery.conf.update(
    task_serializer="json",
    result_serializer="json",
    accept_content=["json"]
)
