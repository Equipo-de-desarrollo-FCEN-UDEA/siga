from typing import List

from sqlalchemy.orm import Session

from app.domain.models import Rol, User, UserRol
from app.domain.schemas import UserRolCreate, UserRolUpdate
from app.domain.policies import UserRolPolicy
from app.core.logging import get_logging
from .base import CRUDBase

log = get_logging(__name__)


class CRUDUserRol(CRUDBase[UserRol, UserRolCreate, UserRolUpdate, UserRolPolicy]):
    def create(
        self,
        db: Session,
        user: User,
        rol_id: str,
        description: str
    ) -> UserRol:
        
        data = UserRolCreate(
            rol_id = rol_id,
            user_id = user.id, description = description)

        db_obj = UserRol(**dict(data))
        self.policy.create(user,data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj
    
    #Get roles from current_user
    def get_multi(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[UserRol]:
        userrol = who.userrol[0]
        objs_db = db.\
            query(UserRol).\
            filter(UserRol.user_id >= userrol.user_id).\
            offset(skip).\
            limit(limit).\
            all()

        return objs_db
    
    #Get users from a directive rol
    def get_users(
        self,
        db: Session,
        who: User,
        lookrol: int,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[UserRol]:
        self.policy.get_users(who)
        return (db.
                query(UserRol).
                filter(UserRol.rol_id <= lookrol).
                filter(UserRol.rol_id > who.userrol[0].rol_id).
                offset(skip).
                limit(limit).
                all())
    
policy = UserRolPolicy()

userrol = CRUDUserRol(UserRol, policy=policy)
