from .base import BaseErrors


class TokenErrors(BaseErrors):
    pass

token403 = TokenErrors(code=403, detail="No pudimos validar tus credenciales")