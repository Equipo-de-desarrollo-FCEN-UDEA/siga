from typing import Any, List
from datetime import date
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

    def get_multi(self, db: Session) -> List[CronJob]:

        today = date.now()

        log.debug('today',today)
        
        #Busca en cronjob todos mensajes que se deben enviar ese dia
        db_objs = db.\
            query(CronJob).\
            filter(CronJob.send_date == today).\
            all()
        return db_objs


policy = CronJobPolicy()

cron_job = CRUDCronJob(CronJob, policy=policy)
