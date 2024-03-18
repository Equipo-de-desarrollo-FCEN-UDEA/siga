from typing import Union, Dict, Any, List

from app.domain.models import User
from app.domain.schemas.user import UserCreate
from app.domain.errors.user import *
from app.domain.schemas import UserUpdate, UserRolResponse

from .base import Base


# We create the policies for handle users
class UserPolicy(Base[User, UserCreate, UserUpdate]):
    def __init__(self) -> None:
        pass
    
    # Policie for know if an user exists
    def get_by_email_id(self, to: User):
        if not to:
            raise user_404

    # This policy filter who cans see another user
    def get(self, who: User, to: User) -> None:

        #Aquí es donde se debe elegir el rol         
        userrol = who.userrol[who.active_rol]
        touser = to.userrol[to.active_rol]

        if not (userrol.rol.scope < 9) and not (who.id == to.id):
            raise user_401
        if not (userrol.rol.scope <= touser.rol.scope):
            raise user_401
        if userrol.rol.scope == 7 or userrol.rol.scope == 6:
            if not (to.department_id == who.department_id):
                raise user_401
        if userrol.rol.scope == 5:
            if not (to.department.school_id == who.department.school_id):
                raise user_401
        if not to:
            raise user_404
        return None

    # This policie decide who can see the list of users
    def get_multi(self, who: User) -> None:
        #Aquí es donde se debe elegir el rol
        userrol = who.userrol[who.active_rol]

        if not (userrol.rol.scope < 9):
            raise user_401
        return None

    def create(self, to: User) -> None:
        if to:
            raise user_registered

    # This policie handle who can update a user and if himself is trying to deactive
    def update(self, who: User, obj_in: Union[UserUpdate, Dict[str, Any]], to: User) -> None:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        userrol = who.userrol[who.active_rol]
        if not (userrol.rol.scope < 9) and not (who.id == to.id):
            raise user_401
        if 'active' in update_data:
            if who.id == to.id and update_data['active'] != to.active:
                raise user_401
        return None

    # This policie handle update password, maybe it will be removed
    def update_password(self, who: User, to: User, password, confirmpassword) -> None:
        userrol = who.userrol[who.active_rol]
        if not (userrol.rol.scope < 9) and not (who.id == to.id):
            raise user_401
        if not password == confirmpassword:
            raise user_diferent_password
        return None

    # This policie handle update password, maybe it will be removed
    def update_active_rol(self, who: User, to: User, new_active_rol: int, assigned_roles: List[int]) -> None:
        userrol = who.userrol[who.active_rol]
        if not (userrol.rol.scope < 9) and not (who.id == to.id):
            raise user_401
        if new_active_rol not in assigned_roles:
            raise user_selecting_rol
        return None

    # This policie handle who can delete an user, it will be removed
    def delete(self, who: User, to: User | None) -> None:
        userrol = who.userrol[who.active_rol]
        if not (userrol.rol.scope < 9):
            raise user_401
        return None

    # Policie for authenticate user, if is inactive raise error
    def authenticate(self, who: User):
        if not who:
            raise user_404
        if not who.active:
            raise user_inactive
        
        