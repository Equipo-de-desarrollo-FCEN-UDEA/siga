from app.domain.errors.base import BaseErrors

class EconomicSupportErrors (BaseErrors):
    pass

economic_support_403 = EconomicSupportErrors(403, 'No tiene permitido pedir un apoyo economico en esta dependencia')