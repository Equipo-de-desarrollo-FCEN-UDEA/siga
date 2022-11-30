from app.domain.models import ApplicationSubType
from app.domain.schemas import ApplicationSubTypeCreate, ApplicationSubTypeUpdate
from app.domain.policies import ApplicationSubTypePolicy
from app.services.crud.base import CRUDBase


class CRUDApplicationSubType(CRUDBase[ApplicationSubType, ApplicationSubTypeCreate, ApplicationSubTypeUpdate, ApplicationSubTypePolicy]):
    pass

policy = ApplicationSubTypePolicy()

application_sub_type = CRUDApplicationSubType(ApplicationSubType, policy=policy)