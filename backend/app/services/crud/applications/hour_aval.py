from app.domain.models import HourAval
from app.domain.schemas import HourAvalCreate, HourAvalUpdate
from app.domain.policies.applications.hour_aval import HourAvalPolicy
from .base import CRUDBase

class CRUDHourAval(CRUDBase[HourAval, HourAvalCreate, HourAvalUpdate, HourAvalPolicy]):
    pass

policy = HourAvalPolicy()

hour_aval = CRUDHourAval(HourAval, HourAvalPolicy)