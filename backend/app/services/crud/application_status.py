from app.domain.models import Application_status, User
from app.domain.schemas import Application_statusCreate, Application_statusUpdate
from app.domain.policies import Application_statusPolicy
from .base import CRUDBase

from sqlalchemy.orm import Session


class CRUDApplication_status(CRUDBase[Application_status, Application_statusCreate, Application_statusUpdate, Application_statusPolicy]):
    
    def create(self, db: Session, who: User, *, obj_in: Application_statusCreate) -> Application_status:
        self.policy.create(who)
        #db_obj = super().create(db, who, obj_in=obj_in)
        db.add(obj_in)
        db.commit()
        db.refresh(obj_in)
        return obj_in


policy = Application_statusPolicy()

application_status = CRUDApplication_status(Application_status, policy=policy)