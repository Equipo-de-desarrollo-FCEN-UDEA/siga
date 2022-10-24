from .base import BaseErrors


class UsuarioErrors(BaseErrors):
    pass


Usuario400 = UsuarioErrors(400, "Bad request")

Usuario401 = UsuarioErrors(401, "No autorizado")

Usuario403 = UsuarioErrors(403, "Metodo no autorizado")

Usuario404 = UsuarioErrors(404, "Usuario no encontrado")

Usuario422 = UsuarioErrors(422, "Esta entidad no se puede procesar")

UsuarioRegistrado = UsuarioErrors(
    409, "Este usuario no se puede registras, su número de identificación se encuentra ya registrado")

UsuarioContrasenasDiferentes = UsuarioErrors(
    422, "Las contraseñas no coinciden"
)