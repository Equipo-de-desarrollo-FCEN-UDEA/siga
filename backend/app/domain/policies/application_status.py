from app.domain.models import Application_status, User, Application, Status
from app.domain.errors.application_status import Application_statusErrors
from app.domain.schemas import Application_statusUpdate, Application_statusCreate
from .base import Base

from app.core.logging import get_logging


log = get_logging(__name__)


class Application_statusPolicy(Base[Application_status, Application_statusCreate, Application_statusUpdate]):

    def create(self, who: User, to: Application) -> tuple[str, list[int]]:
        status_fluxes = to.application_sub_type.application_type.status_flux
        actual_status = to.application_status[-1].status.name
        userrol = who.userrol[0]
        for i, flux in enumerate(status_fluxes):
            if actual_status == flux["status"]:
                next_status = i+1
        if not (actual_status == 'RECHAZADA' or actual_status == 'EN CREACIÓN'):
            if not (userrol.rol.scope in status_fluxes[next_status]['scope']):
                status = ''
                for i, flux in enumerate(status_fluxes):
                    if userrol.rol.scope in flux["scope"]:
                        status = status_fluxes[i-1]['status']
                raise Application_statusErrors(
                    403, detail=f"No puedes tomar acción sobre esta solicitud, solo puedes tomar acción cuando la solicitud está en estado {status}")
        if actual_status == 'RECHAZADA':
            actual_status = to.application_status[-2].status.name
            for i, flux in enumerate(status_fluxes):
                if actual_status == flux["status"]:
                    next_status = i+1
            return status_fluxes[next_status]['status']
        if status_fluxes[next_status]['status'] == 'APROBADA':
            scope = []
        else:
            scope = status_fluxes[next_status + 1]['scope']
        return status_fluxes[next_status]['status'], scope

    def request(self, who: User, to: Application, current: any) -> str:
        status_fluxes = to.application_sub_type.application_type.status_flux
        actual_status = to.application_status[-1].status.name

        for i, flux in enumerate(status_fluxes):
            if actual_status == flux["status"]:
                next_status = i+1

        if to.user_id != who.id:
            raise Application_statusErrors(
                403, detail=f"No puedes tomar acción sobre esta solicitud")

        if actual_status == 'EN CREACIÓN':

            if current.initial_letter == None and current.vice_format == None and current.work_plan == None and to.application_sub_type.application_type.name == 'DEDICACIÓN EXCLUSIVA':
                raise Application_statusErrors(
                    403, detail=f"Debes diligenciar los 3 formatos para solicitar la dedicación")

        return status_fluxes[next_status]['status']
