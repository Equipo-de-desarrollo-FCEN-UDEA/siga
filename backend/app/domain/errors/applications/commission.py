from app.domain.errors.base import BaseErrors


class CommissionErrors(BaseErrors):
    pass


commission_compliment_403 = CommissionErrors(403, "La fecha de tu comisión aún no se cumple")

commission_compliment_404 = CommissionErrors(403, 'No se puede subir nuevamente un cumplido')