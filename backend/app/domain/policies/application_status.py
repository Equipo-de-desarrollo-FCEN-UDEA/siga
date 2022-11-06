from app.domain.models import Application_status
from app.domain.schemas import Application_statusUpdate, Application_statusCreate
from .base import Base

class Application_statusPolicy(Base[Application_status, Application_statusCreate, Application_statusUpdate]):
    pass

