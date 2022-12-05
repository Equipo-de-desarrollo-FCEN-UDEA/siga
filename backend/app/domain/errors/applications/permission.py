from app.domain.errors.base import BaseErrors


class PermissionErrors(BaseErrors):
    pass


permission_401 = PermissionErrors(403, "No se puede pedir más de un permiso remunerado por semestre")
