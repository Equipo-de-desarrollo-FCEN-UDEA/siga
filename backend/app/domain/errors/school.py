from .base import BaseErrors


class SchoolErrors(BaseErrors):
    pass


School400 = SchoolErrors(400, "Bad request")

School401 = SchoolErrors(401, "No autorizado")

School403 = SchoolErrors(403, "Metodo no autorizado")

School404 = SchoolErrors(404, "School no encontrado")

School422 = SchoolErrors(422, "Esta entidad no se puede procesar")
