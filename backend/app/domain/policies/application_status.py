from app.domain.models import Application_status, User, Application, Status
from app.domain.errors.application_status import Application_statusErrors
from app.domain.schemas import Application_statusUpdate, Application_statusCreate
from .base import Base


class Application_statusPolicy(Base[Application_status, Application_statusCreate, Application_statusUpdate]):
    def create(self, who: User, to: Application) -> str:
        status_fluxes = to.application_sub_type.application_type.status_flux
        actual_status = to.application_status[-1].status.name
        for i, flux in enumerate(status_fluxes):
            if actual_status == flux["status"]:
                next_status = i+1
        if not (actual_status == 'RECHAZADA'):
            if not (who.rol.scope in status_fluxes[next_status]['scope']):
                status = ''
                for i, flux in enumerate(status_fluxes):
                    if who.rol.scope in flux["scope"]:
                        status = status_fluxes[i-1]['status']
                raise Application_statusErrors(403, detail=f"No puedes tomar acción sobre esta solicitud, solo puedes tomar acción cuando la solicitud está en estado {status}")
        if actual_status == 'RECHAZADA':
            actual_status = to.application_status[-2].status.name
            for i, flux in enumerate(status_fluxes):
                if actual_status == flux["status"]:
                    next_status = i+1
            return status_fluxes[next_status]['status']
        return status_fluxes[next_status]['status']
