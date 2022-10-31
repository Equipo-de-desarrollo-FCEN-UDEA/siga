from app.domain.schemas.department import DeparmentUpdate, DepartmentCreate
from app.domain.models import Department, User
from app.domain.errors.department import *
from .base import Base


class DepartmentPolicy(Base[Department, DepartmentCreate, DeparmentUpdate]):
    def get_multi(self, who: User) -> None:
        if who.rol.scope > 5:
            raise Department401

        return None

    def get_multi_by_school(self, id: int) -> None:
        if id ==1:
            raise Department401
        
        return None