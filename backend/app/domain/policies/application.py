from typing import Union, Dict, Any

from app.domain.models import Application, User
from app.domain.errors.application import *
from app.domain.schemas import ApplicationUpdate, ApplicationCreate
from .base import Base
from app.core.logging import get_logging

log = get_logging(__name__)

# Here we handle Applications policies


class ApplicationPolicy(Base[Application, ApplicationCreate, ApplicationUpdate]):
    # who can see an Application of another user
    def get(self, who: User, to: Application) -> None:

        if not to:
            raise application_404

        elif not (who.rol.scope < 9) and not (who.id == to.user.id):
            raise application_401

        elif not (who.rol.scope <= to.user.rol.scope):
            raise application_401

        elif (who.rol.scope == 7) or (who.rol.scope == 6):
            if not (to.user.department_id == who.department_id):
                raise application_401

        elif who.rol.scope == 5:
            if not (to.user.department.school_id == who.department.school_id):
                raise application_401

        return None

    # Who can create a application of a subtype
    def create(self, who: User, to: ApplicationCreate) -> None:

        application_sub_type = to.application_sub_type_id

        # Permiso
        if (application_sub_type in [1, 2, 3, 4, 5, 6, 7] and
                not (who.rol.scope == 11 or who.rol.scope == 9)):

            raise application_401

        # Comisión
        if (application_sub_type in [8, 9]
                and not (who.rol.scope == 11 or who.rol.scope == 9)):
            raise application_401

        # Dedicación
        if (application_sub_type == 10 and not (who.rol.scope == 9)):
            raise application_401

        return None

    # Only the user can update the application and cant update if its in a status different of SOLICITADA or RECHAZADA
    def update(self, who: User, to: Application,
               obj_in: Union[ApplicationUpdate, Dict[str, Any]]) -> None:

        app_status = to.application_status[-1].status.name
        if not (who.id == to.user_id):
            raise application_401

        if not (app_status == 'SOLICITADA' or app_status == 'RECHAZADA'):
            raise application_in_other_status

        return None

    # Only the user can delete the application and cant delete if its in a status different of SOLICITADA or RECHAZADA
    def delete(self, who: User, to: Application) -> None:
        app_status = to.application_status[-1].status.name

        if not (who.id == to.user_id):
            raise application_401

        if not (app_status == 'SOLICITADA' or app_status == 'RECHAZADA'):
            raise application_401

        return None
