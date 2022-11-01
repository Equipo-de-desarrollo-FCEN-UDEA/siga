from app.domain.models import Application_state
from app.domain.schemas import Application_stateCreate, Application_stateUpdate
from app.domain.policies import Application_statePolicy
from .base import CRUDBase


class CRUDApplication_state(CRUDBase[Application_state, Application_stateCreate, Application_stateUpdate, Application_statePolicy]):
    pass

policy = Application_statePolicy()

application_state = CRUDApplication_state(Application_state, policy=policy)