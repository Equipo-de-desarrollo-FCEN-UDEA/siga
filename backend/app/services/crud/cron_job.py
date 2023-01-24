from typing import Any, List
from datetime import datetime
from sqlalchemy import exc, extract
from dateutil.relativedelta import relativedelta

# from odmantic import ObjectId
# from odmantic.session import AIOSession

from sqlalchemy.orm import Session

from app.domain.models import CronJob, User
from app.domain.schemas import CronJobCreate, CronJobUpdate
from app.domain.policies import CronJobPolicy
from .base import CRUDBase

from app.core.logging import get_logging

log = get_logging(__name__)


class CRUDCronJob(CRUDBase[CronJob, CronJobCreate, CronJobUpdate, CronJobPolicy]):

    def get_multi(self, db: Session, today: datetime) -> List[CronJob]:

        log.debug('today',today)
        
        #Busca en cron_job todos mensajes que se deben enviar hoy
        db_objs = db.\
            query(CronJob).\
            filter(extract('month', CronJob.send_date) == today.month,
            extract('year', CronJob.send_date) == today.year,
            extract('day', CronJob.send_date) == today.day).\
            all()

        log.debug('db_objs',db_objs)
        
        return db_objs


policy = CronJobPolicy()

cron_job = CRUDCronJob(CronJob, policy=policy)
