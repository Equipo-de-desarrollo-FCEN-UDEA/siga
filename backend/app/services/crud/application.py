from app.domain.models import Application
from app.domain.schemas import ApplicationCreate, ApplicationUpdate
from app.domain.policies import ApplicationPolicy
from .base import CRUDBase


class CRUDApplication(CRUDBase[Application, ApplicationCreate, ApplicationUpdate, ApplicationPolicy]):
    pass


policy = ApplicationPolicy()

application = CRUDApplication(Application, policy=policy)
