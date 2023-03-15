from app.domain.models import Vacation
from app.domain.schemas import VacationCreate, VacationUpdate
from app.domain.policies.base import Base
from app.domain.models.applications.vacation import *


class VacationPolicy(Base[Vacation, VacationCreate, VacationUpdate]):
    pass
