from typing import List

from sqlalchemy.orm import Session

from app.domain.models import Rol, User, UserRol
from app.domain.schemas import UserRolCreate, UserRolUpdate
from app.domain.policies import RolPolicy
from app.core.logging import get_logging
from .base import CRUDBase

log = get_logging(__name__)


class CRUDUserRol(CRUDBase[UserRol, UserRolCreate, UserRolUpdate, RolPolicy]):
    def get_multi(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[Rol]:
        objs_db = db.\
            query(UserRol).\
            filter(Rol.scope >= who.rol.scope).\
            offset(skip).\
            limit(limit).\
            all()

        return objs_db

    # def get_expose(
    #     self,
    #     db: Session,
    #     *,
    #     skip: int = 0,
    #     limit: int = 100
    # ) -> List[User]:
    #     return (db.
    #             query(UserRol).
    #             filter(Rol.scope >= 9).
    #             offset(skip).
    #             limit(limit).
    #             all())


policy = RolPolicy()

users_rol = CRUDUserRol(UserRol, policy=policy)
