from datetime import datetime

from app.domain.models import Commission
from app.domain.schemas import CommissionCreate, CommissionUpdate
from app.domain.policies.base import Base
from app.domain.errors.applications.commission import *


class CommissionPolicy(Base[Commission, CommissionCreate, CommissionUpdate]):
    def compliment(self, commission: Commission) -> None:
        if not (commission.end_date < datetime.now()):
            raise commission_compliment_403
        if commission.compliment is not None:
            raise commission_compliment_404
        return None