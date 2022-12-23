from typing import Any, List
from datetime import date
from dateutil.relativedelta import relativedelta

from odmantic import ObjectId
from odmantic.session import AIOSession

from app.domain.models import CronJob, User
from app.domain.schemas import CronJobCreate, CronJobUpdate
from app.domain.policies import CronJobPolicy
from .base import CRUDBase


class CRUDCronJob(CRUDBase[CronJob, CronJobCreate, CronJobUpdate, CronJobPolicy]):
    async def get_partial_report(self, engine: AIOSession, who: User) -> List[CronJob]:
        self.policy.get_multi(who=who)


        today = date.now()
        send_date = today - relativedelta(months=1)

        where = {
            "send_date": send_date,
        }

        # Busca en MongoDB todos mensajes que se deben enviar ese dia 
        # cambio de estado 
        partial_reports = await engine.find(self.model, where)

        pass

    def get_final_report(self, db: AIOSession, who: User) -> List[CronJob]:
        pass


policy = CronJobPolicy()

cron_job = CRUDCronJob(CronJob, policy=policy)
