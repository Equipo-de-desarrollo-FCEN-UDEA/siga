
from  app.domain.models import Vacation, Application, User, Application_status
from  app.domain.schemas import VacationCreate, VacationUpdate 
from  app.domain.policies.applications.vacation import VacationPolicy

from .base import CRUDBase

class CRUDVacation(CRUDBase[Vacation, VacationCreate, VacationUpdate]):
    pass

policy   = VacationPolicy()
vacation = CRUDVacation(Vacation, policy=policy)