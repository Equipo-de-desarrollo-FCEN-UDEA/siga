from typing import Any

from odmantic import ObjectId
from odmantic.session import AIOSession

from  app.domain.models import Vacation
from  app.domain.schemas import VacationCreate, VacationUpdate 
from  app.domain.policies.applications.vacation import VacationPolicy

from .base import CRUDBase

class CRUDVacation(CRUDBase[Vacation, VacationCreate, VacationUpdate, VacationPolicy]):
    pass

policy   = VacationPolicy()
vacation = CRUDVacation(Vacation, policy=policy)