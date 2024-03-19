from app.domain.errors.school import School401
from app.domain.schemas import SchoolCreate, SchoolUpdate
from app.domain.models import School, User
from app.domain.errors import *
from .base import Base


class SchoolPolicy(Base[School, SchoolCreate, SchoolUpdate]):
    def get_multi(self, who: User) -> None:
        userrol = who.userrol[who.active_rol]
        if userrol.rol.scope > 5:
            raise School401
        return None
