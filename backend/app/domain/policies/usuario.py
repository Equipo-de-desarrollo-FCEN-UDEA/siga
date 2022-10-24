from typing import Union, Dict, Any

from app.domain.models import Usuario
from app.domain.schemas.usuario import UsuarioCreate
from app.domain.schemas.errors.usuario import Usuario401, Usuario404, UsuarioContrasenasDiferentes
from app.domain.schemas import UsuarioUpdate
from .base import Base


class UsuarioPolicy(Base[Usuario, UsuarioCreate, UsuarioUpdate]):
    def __init__(self) -> None:
        pass

    def get(self, who: Usuario, to: Usuario) -> None:
        if not who.is_superuser and not (who.id == to.id):
            raise Usuario401
        if not to:
            raise Usuario404
            
    def get_multi(self, who: Usuario) -> None:
        if not who.is_superuser:
            raise Usuario401

    def create(self, who: Usuario) -> None:
        if not who.is_superuser:
            raise Usuario401

    def update(self, who: Usuario, to: Union[UsuarioUpdate, Dict[str, Any]]) -> None:
        if not who.is_superuser and (to.activo != None):
            raise Usuario401

    def update_password(self, who: Usuario, to: Usuario, password, confirmpassword) ->None:
        if not who.is_superuser and not (who.id == to.id):
            raise Usuario401
        if not password == confirmpassword:
            raise UsuarioContrasenasDiferentes

    def delete(self, who: Usuario, to: Usuario | None) -> None:
        if not who.is_superuser:
            raise Usuario401

