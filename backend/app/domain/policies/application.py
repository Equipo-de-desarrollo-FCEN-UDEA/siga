from app.domain.models import Application, User
from app.domain.errors.application import *
from app.domain.schemas import ApplicationUpdate, ApplicationCreate
from .base import Base


class ApplicationPolicy(Base[Application, ApplicationCreate, ApplicationUpdate]):
    def get(self, who: User, to: Application) -> None:
        if not (who.rol.scope < 9) and not (who.id == to.user.id):
            raise Application401
        if not (who.rol.scope <= to.user.rol.scope):
            raise Application401
        if who.rol.scope == 7:
            if not (to.user.department_id == who.department_id):
                raise Application401
        if who.rol.scope == 5:
            if not (to.user.department.school_id == who.department.school_id):
                raise Application401
        if not to:
            raise Application404
        return None

    def create(self, who: User, to: ApplicationCreate) -> None:
        applicationSubType = to.applicationSubType_id
        if (applicationSubType in [1, 2, 3, 4, 5, 6, 7]
                and not (who.rol.scope == 11 or who.rol.scope == 9)):  # Permiso
            raise Application401
        if (applicationSubType in [8, 9]
                and not (who.rol.scope == 11 or who.rol.scope == 9)):  # Comision
            raise Application401
        if (applicationSubType == 10 and not (who.rol.scope == 7)):
            raise Application401
        return None
