from app.domain.models import Application_status
from app.domain.schemas import Application_statusCreate, Application_statusUpdate
from app.domain.policies import Application_statusPolicy
from .base import CRUDBase


class CRUDApplication_status(CRUDBase[Application_status, Application_statusCreate, Application_statusUpdate, Application_statusPolicy]):
    pass

policy = Application_statusPolicy()

application_status = CRUDApplication_status(Application_status, policy=policy)