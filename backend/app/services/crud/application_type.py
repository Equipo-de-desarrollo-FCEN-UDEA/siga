from app.domain.models import ApplicationType
from app.domain.schemas import ApplicationTypeCreate, ApplicationTypeUpdate
from app.domain.policies import ApplicationTypePolicy
from .base import CRUDBase


class CRUDApplicationType(CRUDBase[ApplicationType, ApplicationTypeCreate, ApplicationTypeUpdate, ApplicationTypePolicy]):
    pass

policy = ApplicationTypePolicy()

application_type = CRUDApplicationType(ApplicationType, policy=policy)