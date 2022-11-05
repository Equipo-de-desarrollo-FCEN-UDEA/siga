from .base import BaseErrors


class ApplicationErrors(BaseErrors):
    pass


Application400 = ApplicationErrors(400, "Bad request")

Application401 = ApplicationErrors(401, "No autorizado")

Application403 = ApplicationErrors(403, "Metodo no autorizado")

Application404 = ApplicationErrors(404, "Solicitud no encontrada")

Application422 = ApplicationErrors(422, "Esta entidad no se puede procesar")
