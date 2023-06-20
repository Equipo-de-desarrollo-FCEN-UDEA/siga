from .base import BaseErrors

class UserApplicationErrors(BaseErrors):
    pass

user_application_401 = UserApplicationErrors(401, "No autorizado")