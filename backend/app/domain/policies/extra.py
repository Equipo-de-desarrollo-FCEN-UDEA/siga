from app.domain.schemas.extra import ExtraUpdate, ExtraCreate
from app.domain.models import Extra, User
from app.domain.errors.extra import *
from .base import Base

class ExtraPolicy(Base[Extra, ExtraCreate, ExtraUpdate]):
    # def get_multi(self, who: User) -> None:
    #     if who.rol.scope > 5:
    #         raise Extra401

    #     return None
    pass