from .base import BaseErrors


class RolErrors(BaseErrors):
    pass


Rol400 = RolErrors(400, "Bad request")

Rol401 = RolErrors(401, "No autorizado")

Rol403 = RolErrors(403, "Metodo no autorizado")

Rol404 = RolErrors(404, "Rol no encontrado")

Rol422 = RolErrors(422, "Esta entidad no se puede procesar")
