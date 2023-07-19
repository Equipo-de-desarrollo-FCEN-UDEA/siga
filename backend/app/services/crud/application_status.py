from sqlalchemy.orm import Session

from app.domain.models import Application, Application_status, Status, User, Department, Rol
from app.domain.policies import Application_statusPolicy
from app.domain.schemas import (Application_statusCreate,
                                Application_statusUpdate)
from app.services.emails import create_application_email
from .base import CRUDBase
from app.core.logging import get_logging

log = get_logging(__name__)


class CRUDApplication_status(CRUDBase[Application_status, Application_statusCreate, Application_statusUpdate, Application_statusPolicy]):
    def create(self, db: Session, who: User, *, obj_in: Application_statusCreate, to: Application) -> Application_status:
        next_status, scope = self.policy.create(who=who, to=to)
        status = db.query(Status).where(Status.name == next_status).first()
        obj_in_data = dict(obj_in)
        if not (obj_in.status_id == 4):
            obj_in_data['status_id'] = status.id
            queries = [Department.school_id ==
                       who.department.school_id, Rol.scope.in_(scope)]
            to_notify: list[User] = db.query(User).join(
                Rol).join(Department).filter(*queries).all()
            log.debug(scope)
            for to_user in to_notify:
                log.debug(to_user.__dict__)
                create_application_email.apply_async(args=(to_user.names.lower(), to_user.last_names.lower(
                ), to.application_sub_type.name, 'http://siga-fcen.com/solicitudes/lista', to_user.email))
        db_obj = Application_status(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def finalize(self, db: Session, *, obj_in: Application_statusCreate) -> Application_status:
        status = db.query(Status).where(Status.name == 'FINALIZADA').first()
        obj_in_data = dict(obj_in)
        obj_in_data['status_id'] = status.id
        db_obj = Application_status(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def request(self, db: Session, who: User, *, obj_in: Application_statusCreate, to: Application, current: any) -> Application_status:
        next_status = self.policy.request(who=who, to=to, current=current)
        status = db.query(Status).where(Status.name == next_status).first()
        obj_in_data = dict(obj_in)
        obj_in_data['status_id'] = status.id
        db_obj = Application_status(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_application_status(
            self,
            db: Session,
            *,
            id: int) -> list[Application_status]:
        return db.query(Application_status).filter(Application_status.application_id == id).all()


policy = Application_statusPolicy()

application_status = CRUDApplication_status(Application_status, policy=policy)
