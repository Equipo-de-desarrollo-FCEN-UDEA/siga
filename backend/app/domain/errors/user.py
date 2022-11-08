from .base import BaseErrors


class UserErrors(BaseErrors):
    pass


user_400 = UserErrors(400, "Bad request")

user_401 = UserErrors(401, "No autorizado")

user_403 = UserErrors(403, "Metodo no autorizado")

user_404 = UserErrors(404, "User no encontrado")

user_422 = UserErrors(422, "Esta entidad no se puede procesar")

user_registered = UserErrors(
    409, "Este user no se puede registrar, su número de identificación o correo electrónico se encuentra ya registrado")

user_diferent_password = UserErrors(
    422, "Las contraseñas no coinciden"
)

user_inactive = UserErrors(
    401, "Tu cuenta no se encuentra activa, recuerda revisar tu correo para activarla o pide correo de activación nuevamente")
