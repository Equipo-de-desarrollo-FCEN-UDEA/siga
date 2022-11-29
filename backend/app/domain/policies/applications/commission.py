from app.domain.models import Commission
from app.domain.schemas import CommissionCreate, CommissionUpdate
from app.domain.policies.base import Base


class CommissionPolicy(Base[Commission, CommissionCreate, CommissionUpdate]):
    pass