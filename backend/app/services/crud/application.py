from typing import List

from sqlalchemy.orm import Session

from app.domain.models import Application, User, ApplicationSubType, Application_state, Department
from app.domain.schemas import ApplicationCreate, ApplicationUpdate, Application_stateCreate
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
        filed: bool = False,
        type: int = 0
    ) -> List[Application]:
        queries = []

        # Cadena de filtros de acuerdo a el rol o la búsqueda del usuario
        if type:
            queries += [ApplicationSubType.applicationType_id == type]

        if who.rol.scope >= 9:
            queries += [User.id == who.id]

        if who.rol.scope < 9:
            queries += [Application.filed == filed]

        if who.rol.scope == 7:
            queries += [User.department_id == who.department.id]

        if who.rol.scope == 5:
            queries += [Department.school_id == who.department.school_id]

        if search:
            columns = [
                'names',
                'lastNames',
                'identificationNumber',
                'email'
            ]
            search = search.upper()
            raw = [
                db.query(Application)
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
                   .join(User)
                   .join(ApplicationSubType)
                   .join(Department)
                   .filter(*queries)
                   .offset(skip)
                   .limit(limit)
                   .all())

        return objs_db

    def create(self, db: Session, who: User, obj_in: ApplicationCreate) -> Application:
        db_obj = super().create(db, who, obj_in=obj_in)
        application_state = Application_stateCreate(
            application_id=db_obj.id,
            state_id=1,
            observation='Solicitud creada'
        )
        state_obj = Application_state(**dict(application_state))
        db.add(state_obj)
        db.commit()
        db.refresh(state_obj)
        return db_obj



policy = ApplicationPolicy()

application = CRUDApplication(Application, policy=policy)
