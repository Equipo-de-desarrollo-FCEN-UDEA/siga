from .base import BaseErrors


class Application_statusErrors(BaseErrors):
    pass


application_status_403 = Application_statusErrors(
    403, "Actualmente no se le puede asignar este estado a la solicitud")
