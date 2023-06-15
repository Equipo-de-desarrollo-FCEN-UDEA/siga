from typing import List

from sqlalchemy.orm import Session

from app.domain.models import Rol, User, UserRol
from app.domain.schemas import UserRolCreate, UserRolUpdate
from app.domain.policies import RolPolicy
from app.core.logging import get_logging
from .base import CRUDBase

log = get_logging(__name__)


class CRUDUserRol(CRUDBase[UserRol, UserRolCreate, UserRolUpdate, RolPolicy]):
    def create(
        self,
        db: Session,
        id_user: User,
        rol_id: str
    ) -> UserRol:
        
        data = UserRolCreate(
            rol_id = rol_id,
            user_id = id_user)
        # data2 = dict(obj_in)
        # dataUser = User(**data2)
        # print(dataUser)
        # # data['user_id'] = dataUser['id']
        # data.rol_id= rol_id
        # data.user_id = obj_in.id
        

        db_obj = UserRol(**dict(data))
        # self.policy.create(to=user)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

policy = RolPolicy()

userrol = CRUDUserRol(UserRol, policy=policy)
