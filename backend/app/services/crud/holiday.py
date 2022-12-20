
from app.domain.schemas import HolidayCreate
from app.domain.models import Holiday
from app.domain.policies import HolidayPolicy
from app.domain.schemas.holiday import HolidayUpdate
from .base import CRUDBase


class CRUDHoliday(CRUDBase[Holiday, HolidayCreate, HolidayUpdate, HolidayPolicy]):
    pass


policy = HolidayPolicy()

holiday = CRUDHoliday(Holiday, policy=policy)
