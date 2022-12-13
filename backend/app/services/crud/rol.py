from typing import List

from sqlalchemy.orm import Session

from app.domain.models import Rol, User
from app.domain.schemas import RolCreate, RolUpdate
from app.domain.policies import RolPolicy
from app.core.logging import get_logging
from .base import CRUDBase

log = get_logging(__name__)


class CRUDRol(CRUDBase[Rol, RolCreate, RolUpdate, RolPolicy]):
    def get_multi(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[Rol]:
        objs_db = db.\
            query(Rol).\
            filter(Rol.scope >= who.rol.scope).\
            offset(skip).\
            limit(limit).\
            all()

        return objs_db

    def get_expose(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[Rol]:
        return (db.
                query(Rol).
                filter(Rol.scope >= 9).
                offset(skip).
                limit(limit).
                all())


policy = RolPolicy()

rol = CRUDRol(Rol, policy=policy)
