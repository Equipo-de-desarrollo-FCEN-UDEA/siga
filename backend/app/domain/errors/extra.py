from .base import BaseErrors


class ExtraErrors(BaseErrors):
    pass


Extra400 = ExtraErrors(400, "Bad request")

Extra401 = ExtraErrors(401, "No autorizado")

Extra403 = ExtraErrors(403, "Metodo no autorizado")

Extra404 = ExtraErrors(404, "Department no encontrado")

Extra422 = ExtraErrors(422, "Esta entidad no se puede procesar")