from app.domain.models import Application_state
from app.domain.schemas import Application_stateUpdate, Application_stateCreate
from .base import Base

class Application_statePolicy(Base[Application_state, Application_stateCreate, Application_stateUpdate]):
    pass

