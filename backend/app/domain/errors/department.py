from .base import BaseErrors


class DepartmentErrors(BaseErrors):
    pass


Department400 = DepartmentErrors(400, "Bad request")

Department401 = DepartmentErrors(401, "No autorizado")

Department403 = DepartmentErrors(403, "Metodo no autorizado")

Department404 = DepartmentErrors(404, "Department no encontrado")

Department422 = DepartmentErrors(422, "Esta entidad no se puede procesar")
