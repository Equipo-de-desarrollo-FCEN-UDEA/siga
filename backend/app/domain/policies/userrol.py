from typing import Union, Dict, Any

from app.domain.models import UserRol, User
from app.domain.schemas.userrol import UserRolCreate, UserRolUpdate
from app.domain.errors.user import *
from app.domain.schemas import UserResponse


from .base import Base


# We create the policies for handle users
class UserRolPolicy(Base[UserRol, UserRolCreate, UserRolUpdate]):
    def __init__(self) -> None:
        pass

    # This policie handle who can create a userrrol and if himself is trying to deactive
    def create(self, who: UserResponse, to: User) -> None:
        if (who.userrol == []):
            pass
        else:
            userrol = to.userrol[to.active_rol]
            if not (userrol.rol.scope < 9):
                raise user_401
            # if 'active' in update_data:
            #     if who.id == self.id:
            #         raise user_401
        return None

    # This policie handle who can delete an user, it will be removed
    def delete(self, who: User, to: UserRolCreate | None) -> None:
        userrol = who.userrol[who.active_rol]
        if not (userrol.rol.scope < 9):
                raise user_401
        return None

    
    def get_multi(self, who: User) -> None:
         return super().get_multi(who)
    
    def get_users(self,who:User) -> None:
         userrol = who.userrol[who.active_rol]
         if not (userrol.rol.scope < 9):
                raise user_401
         return None
