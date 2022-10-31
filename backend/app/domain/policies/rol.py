from typing import List

from app.domain.models import Rol, User
from app.domain.schemas import RolCreate, RolUpdate
from app.domain.errors.rol import Rol400, Rol401, Rol403, Rol404, Rol422
from .base import Base


class RolPolicy(Base[Rol, RolCreate, RolUpdate]):
    def get_multi(self, who: User, rol: List[Rol]) -> None:
        if who.rol.scope >=5:
            raise Rol401
        
        if not rol:
            raise Rol404
        
        return None

