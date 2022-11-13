from app.domain.models import Application_status, User, Application
from app.domain.errors.application_status import Application_statusErrors
from app.domain.schemas import Application_statusUpdate, Application_statusCreate
from .base import Base


class Application_statusPolicy(Base[Application_status, Application_statusCreate, Application_statusUpdate]):
    def create(self, who: User, to: Application) -> None:
        status_fluxes = to.application_sub_type.application_type.status_flux
        actual_status = to.application_status[-1].status.name
        for i, flux in enumerate(status_fluxes):
            if actual_status == flux["status"]:
                next_status = i+1
        if not (actual_status == 'RECHAZADA'):
            if not (who.rol.scope in status_fluxes[next_status]['scope']):
                raise Application_statusErrors(403, detail=f"No puedes aprobar o rechazar hasta que la solicitud no esté en {status_fluxes[next_status]['status']}")
        return None
