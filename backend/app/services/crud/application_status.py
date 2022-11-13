from sqlalchemy.orm import Session

from app.domain.models import Application_status, User, Application
from app.domain.schemas import Application_statusCreate, Application_statusUpdate
from app.domain.policies import Application_statusPolicy
from .base import CRUDBase


class CRUDApplication_status(CRUDBase[Application_status, Application_statusCreate, Application_statusUpdate, Application_statusPolicy]):
    def create(self, db: Session, who: User, *, obj_in: Application_statusCreate, to: Application) -> Application_status:
        self.policy.create(who=who, to=to)
        obj_in_data = dict(obj_in)
        db_obj = Application_status(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


policy = Application_statusPolicy()

application_status = CRUDApplication_status(Application_status, policy=policy)
