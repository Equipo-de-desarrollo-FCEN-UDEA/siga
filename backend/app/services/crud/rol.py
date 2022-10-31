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
        who: User, *,
        skip: int = 0,
        limit: int = 100
    ) -> List[Rol]:
        objs_db = db.\
            query(Rol).\
            filter(Rol.scope > who.rol.scope).\
            offset(skip).\
            limit(limit).\
            all()
            
        return objs_db


policy = RolPolicy()

rol = CRUDRol(Rol, policy=policy)
