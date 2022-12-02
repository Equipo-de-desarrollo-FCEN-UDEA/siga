from app.domain.models import Application, Application_status, Status, User
from app.domain.policies import Application_statusPolicy
from app.domain.schemas import (Application_statusCreate,
                                Application_statusUpdate)
from sqlalchemy.orm import Session

from .base import CRUDBase

from sqlalchemy.orm import Session


class CRUDApplication_status(CRUDBase[Application_status, Application_statusCreate, Application_statusUpdate, Application_statusPolicy]):
    def create(self, db: Session, who: User, *, obj_in: Application_statusCreate, to: Application) -> Application_status:
        next_status = self.policy.create(who=who, to=to)
        status = db.query(Status).where(Status.name == next_status).first()
        obj_in_data = dict(obj_in)
        if not (obj_in.status_id == 4):
            obj_in_data['status_id'] = status.id
        db_obj = Application_status(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def finalize(self, db: Session, who: User, *, obj_in: Application_statusCreate, to: Application) -> Application_status:
        status = db.query(Status).where(Status.name == 'FINALIZADA').first()
        obj_in_data = dict(obj_in)
        obj_in_data['status_id'] = status.id
        db_obj = Application_status(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


policy = Application_statusPolicy()

application_status = CRUDApplication_status(Application_status, policy=policy)
