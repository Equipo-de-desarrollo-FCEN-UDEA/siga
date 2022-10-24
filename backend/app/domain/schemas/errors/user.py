from .base import BaseErrors


class UserErrors(BaseErrors):
    pass


User400 = UserErrors(400, "Bad request")

User401 = UserErrors(401, "No autorizado")

User403 = UserErrors(403, "Metodo no autorizado")

User404 = UserErrors(404, "User no encontrado")

User422 = UserErrors(422, "Esta entidad no se puede procesar")

UserRegistrado = UserErrors(
    409, "Este user no se puede registras, su número de identificación se encuentra ya registrado")

UserContrasenasDiferentes = UserErrors(
    422, "Las contraseñas no coinciden"
)