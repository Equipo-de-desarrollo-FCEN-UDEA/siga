from app.domain.models import CronJob
from app.domain.schemas import CronJobCreate, CronJobUpdate
from app.domain.policies.base import Base


class CronJobPolicy(Base[CronJob, CronJobCreate, CronJobUpdate]):
    pass