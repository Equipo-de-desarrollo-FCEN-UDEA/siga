from .base import BaseErrors


class ApplicationErrors(BaseErrors):
    pass


application_400 = ApplicationErrors(400, "Bad request")

application_401 = ApplicationErrors(401, "No autorizado")

application_403 = ApplicationErrors(403, "Metodo no autorizado")

application_404 = ApplicationErrors(404, "Solicitud no encontrada")

application_422 = ApplicationErrors(422, "Esta entidad no se puede procesar")
