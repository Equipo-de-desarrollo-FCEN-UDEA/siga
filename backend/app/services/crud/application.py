from typing import Any, Dict, List, Union

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.domain.models import Application, User, ApplicationSubType, Application_status, Department
from app.domain.schemas import ApplicationCreate, ApplicationUpdate, Application_statusCreate
from app.domain.policies import ApplicationPolicy
from app.core.logging import get_logging
from .base import CRUDBase

log = get_logging(__name__)


class CRUDApplication(CRUDBase[Application, ApplicationCreate, ApplicationUpdate, ApplicationPolicy]):
    def get_multi(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100,
        search: str = '',
        filed: bool | None = None,
        type: int = 0
    ) -> List[Application]:
        queries = []

        # Cadena de filtros de acuerdo a el rol o la búsqueda del usuario
        if type:
            queries += [ApplicationSubType.application_type_id == type]

        if who.rol.scope >= 9:
            queries += [User.id == who.id]

        if who.rol.scope < 9:
            if filed is not None:
                queries += [Application.filed == filed]

        if (who.rol.scope == 7) or (who.rol.scope == 6):
            queries += [User.department_id == who.department.id]

        if who.rol.scope == 5:
            queries += [Department.school_id == who.department.school_id]

        if search:
            columns = [
                'names',
                'last_names',
                'identification_number',
                'email'
            ]
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
            return res

        objs_db = (db.query(Application)
                   .order_by(desc(Application.id))
                   .join(User)
                   .join(ApplicationSubType)
                   .join(Department)
                   .filter(*queries)
                   .offset(skip)
                   .limit(limit)
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
        status_obj = Application_status(**dict(application_status))
        db.add(status_obj)
        db.commit()
        db.refresh(status_obj)
        return db_obj


policy = ApplicationPolicy()

application = CRUDApplication(Application, policy=policy)
