from typing import Any, Dict, List, Union
from datetime import datetime

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.domain.models import Application, User, ApplicationSubType, Application_status, Department, ApplicationType, ApplicationSubType
from app.domain.schemas import ApplicationCreate, ApplicationUpdate, Application_statusCreate
from app.domain.policies import ApplicationPolicy
from app.core.logging import get_logging
from .base import CRUDBase
from app.services.emails import create_application_email

log = get_logging(__name__)


class CRUDApplication(CRUDBase[Application, ApplicationCreate, ApplicationUpdate, ApplicationPolicy]):
    def get_multi(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100,
        search: str | None = None,
        filed: bool | None = None
    ) -> List[Application]:
        queries = []

        # Cadena de filtros de acuerdo a el rol o la búsqueda del usuario
        if who.rol.scope >= 9:
            queries += [User.id == who.id]

        if who.rol.scope < 9:
            # queries += [Application_status.status_id.not_in((6,7))]
            if filed is not None:
                queries += [Application.filed.is_(filed)]

        if (who.rol.scope == 7) or (who.rol.scope == 6):
            queries += [User.department_id == who.department.id]

        if who.rol.scope == 5:
            queries += [Department.school_id == who.department.school_id]

        if search is not None:
            columns = [
                'names',
                'last_names',
                'identification_number',
                'email'
            ]
            log.debug('Entrando en search')
            search = search.upper()
            raw = [
                db.query(Application)
                .order_by(desc(Application.id))
                .join(User)
                .join(ApplicationSubType)
                .join(Department)
                .filter(getattr(User, col).contains(f"{search}"))
                .filter(*queries)
                .offset(skip)
                .limit(limit)
                .all()
                for col in columns
            ]
            res = [user for users in raw for user in users]
            return [*set(res)]

        objs_db = (db.query(Application)
                   .order_by(desc(Application.id))
                   .join(User)
                   .join(ApplicationSubType)
                   .join(Department)
                   .filter(*queries)
                   .limit(limit)
                   .offset(skip)
                   .all())

        return objs_db
    
    def get_all(
        self,
        db: Session,
        who: User,
        *,
        search: str | None = None,
        filed: bool | None = None
    ) -> List[Application]:
        queries = []

        # Cadena de filtros de acuerdo a el rol o la búsqueda del usuario
        if who.rol.scope >= 9:
            queries += [User.id == who.id]

        if who.rol.scope < 9:
            # queries += [Application_status.status_id.not_in((6,7))]
            if filed is not None:
                queries += [Application.filed.is_(filed)]

        if (who.rol.scope == 7) or (who.rol.scope == 6):
            queries += [User.department_id == who.department.id]

        if who.rol.scope == 5:
            queries += [Department.school_id == who.department.school_id]

        if search is not None:
            columns = [
                'names',
                'last_names',
                'identification_number',
                'email'
            ]
            log.debug('Entrando en search')
            search = search.upper()
            raw = [
                db.query(Application)
                .order_by(desc(Application.id))
                .join(User)
                .join(ApplicationSubType)
                .join(Department)
                .filter(getattr(User, col).contains(f"{search}"))
                .filter(*queries)
                .all()
                for col in columns
            ]
            res = [user for users in raw for user in users]
            return [*set(res)]

        objs_db = (db.query(Application)
                   .order_by(desc(Application.id))
                   .join(User)
                   .join(ApplicationSubType)
                   .join(Department)
                   .filter(*queries)
                   .all())

        return objs_db
    
    

    def create(
        self,
        db: Session,
        who: User,
        obj_in: ApplicationCreate,
        *,
        status: int = 1,
        observation: str = 'Solicitud creada'
    ) -> Application:
        db_obj = super().create(db=db, who=who, obj_in=obj_in)
        application_status = Application_statusCreate(
            application_id=db_obj.id,
            status_id=status,
            observation=observation
        )
        if status == 1:
            create_application_email.apply_async(args=(who.names, who.last_names, db_obj.application_sub_type.name,
                                     'http://siga-fcen.com/solicitudes/lista', who.department.coord_email))
        status_obj = Application_status(**dict(application_status))
        db.add(status_obj)
        db.commit()
        db.refresh(status_obj)
        return db_obj

    def update(
        self,
        db: Session,
        who: User,
        *,
        db_obj: Application,
        obj_in: Union[ApplicationUpdate, Dict[str, Any]],
        status: int = 1,
        observation: str = 'Solicitud actualizada'
    ) -> Application:
        db_obj = super().update(db, who, db_obj=db_obj, obj_in=obj_in)
        application_status = Application_statusCreate(
            application_id=db_obj.id,
            status_id=status,
            observation=observation
        )
        if status == 1:
            create_application_email.apply_async(args=(who.names, who.last_names, db_obj.application_sub_type.name,
                                     'http://siga-fcen.com/solicitudes/lista', who.department.coord_email))
        status_obj = Application_status(**dict(application_status))
        db.add(status_obj)
        db.commit()
        db.refresh(status_obj)
        return db_obj


policy = ApplicationPolicy()

application = CRUDApplication(Application, policy=policy)
