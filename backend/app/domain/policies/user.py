from typing import Union, Dict, Any

from app.domain.models import User
from app.domain.schemas.user import UserCreate
from app.domain.errors.user import User401, User404, UserContrasenasDiferentes
from app.domain.schemas import UserUpdate
from .base import Base


# Creamos las políticas específicas para Usuario y devolvemos errores en caso de que no se cumplan
class UserPolicy(Base[User, UserCreate, UserUpdate]):
    def __init__(self) -> None:
        pass

    def get(self, who: User, to: User) -> None:
        if not who.is_superuser and not (who.id == to.id):
            raise User401
        if not to:
            raise User404
        return None

    def get_multi(self, who: User) -> None:
        if not who.is_superuser:
            raise User401
        return None

    def create(self, who: User) -> None:
        if not who.rol_id == 1:
            raise User401
        return None

    def update(self, who: User, to: Union[UserUpdate, Dict[str, Any]]) -> None:
        if not who.is_superuser and (to.activo != None):
            raise User401
        return None

    def update_password(self, who: User, to: User, password, confirmpassword) -> None:
        if not who.is_superuser and not (who.id == to.id):
            raise User401
        if not password == confirmpassword:
            raise UserContrasenasDiferentes
        return None

    def delete(self, who: User, to: User | None) -> None:
        if not who.is_superuser:
            raise User401
        return None
