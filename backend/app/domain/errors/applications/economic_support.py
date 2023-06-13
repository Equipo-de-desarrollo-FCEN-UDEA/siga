from app.domain.errors.base import BaseErrors

class EconomicSupportErrors (BaseErrors):
    pass

economic_support_403 = EconomicSupportErrors(403, 'No tiene permitido pedir un apoyo económico en esta dependencia')
economic_support_401 = EconomicSupportErrors(401, 'No tiene permitido visualizar la solicitud a esta dependencia')