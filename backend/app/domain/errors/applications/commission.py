from app.domain.errors.base import BaseErrors


class CommissionErrors(BaseErrors):
    pass


commission_compliment_401 = CommissionErrors(401, "La fecha de tu comisión aún no se cumple")

commission_compliment_404 = CommissionErrors(404, 'No se puede subir nuevamente un cumplido')