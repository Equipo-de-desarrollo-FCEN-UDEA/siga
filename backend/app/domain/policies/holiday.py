from app.domain.models import Holiday
from app.domain.schemas import HolidayUpdate, HolidayCreate
from .base import Base

class HolidayPolicy(Base[Holiday, HolidayCreate, HolidayUpdate]):
    pass