from app.domain.errors.base import Base
from app.domain.models import Vacation
from app.domain.schemas import VacationCreate, VacationUpdate
from app.domain.models.application import *

class VacationPolicy(Base[Vacation, VacationCreate, VacationUpdate]):
    pass  