from app.domain.models import Commission
from app.domain.schemas import CommissionUpdate
from .base import CRUDBase

class CRUDCommission(CRUDBase[Commission, CommissionUpdate]):
    pass

comission = CRUDCommission(Commission)