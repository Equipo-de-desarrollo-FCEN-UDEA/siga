from app.domain.models import Commission
from app.domain.schemas import CommissionUpdate, CommissionCreate
from app.domain.policies.applications.commission import CommissionPolicy
from .base import CRUDBase

class CRUDCommission(CRUDBase[Commission, CommissionCreate, CommissionUpdate, CommissionPolicy]):
    pass

comission = CRUDCommission(Commission, CommissionPolicy)