from app.domain.models import Application_status, User
from app.domain.schemas import Application_statusUpdate, Application_statusCreate
from .base import Base

class Application_statusPolicy(Base[Application_status, Application_statusCreate, Application_statusUpdate]):
    def __init__(self) -> None:
        pass

    def create(self, who: User) -> None:
        if not (who.rol.scope < 5):
            pass




