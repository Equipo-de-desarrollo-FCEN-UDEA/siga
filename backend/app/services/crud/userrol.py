from typing import List

from sqlalchemy.orm import Session

from app.domain.models import Rol, User, UserRol
from app.domain.schemas import UserRolCreate, UserRolUpdate
from app.domain.policies import RolPolicy
from app.core.logging import get_logging
from .base import CRUDBase

log = get_logging(__name__)


class CRUDUserRol(CRUDBase[UserRol, UserRolCreate, UserRolUpdate, RolPolicy]):
    # def get_multi(
    #     self,
    #     db: Session,
    #     who: User,
    #     *,
    #     skip: int = 0,
    #     limit: int = 100
    # ) -> List[Rol]:
    #     userrol= who.userrol[0]
    #     objs_db = db.\
    #         query(UserRol).\
    #         filter(Rol.scope >= userrol.rol.scope).\
    #         offset(skip).\
    #         limit(limit).\
    #         all()

    #     return objs_db

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

#Verificar esto
    def create(
        self,
        db: Session,
        obj_in: User,
        rol_id: str
    ) -> UserRol:
        
        data = UserRolCreate(
            rol_id = rol_id,
            user_id = obj_in.id)
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
