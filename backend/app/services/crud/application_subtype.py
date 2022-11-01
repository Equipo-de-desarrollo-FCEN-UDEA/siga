from app.domain.models import ApplicationSubType
from app.domain.schemas import ApplicationSubTypeCreate, ApplicationSubTypeUpdate
from app.domain.policies import ApplicationSubTypePolicy
from .base import CRUDBase


class CRUDApplicationSubType(CRUDBase[ApplicationSubType, ApplicationSubTypeCreate, ApplicationSubTypeUpdate, ApplicationSubTypePolicy]):
    pass

policy = ApplicationSubTypePolicy()

applicationSubType = CRUDApplicationSubType(ApplicationSubType, policy=policy)