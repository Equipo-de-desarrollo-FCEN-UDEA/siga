from celery import Celery

from app.core.config import get_app_settings

settings = get_app_settings()

celery = Celery('tasks', broker=settings.redis_url, backend=settings.redis_url)
