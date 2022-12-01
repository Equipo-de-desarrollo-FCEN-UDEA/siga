from typing import Any

from odmantic import ObjectId
from odmantic.session import AIOSession

from app.domain.models import Commission
from app.domain.schemas import CommissionUpdate, CommissionCreate
from app.domain.policies.applications.commission import CommissionPolicy
from .base import CRUDBase

class CRUDCommission(CRUDBase[Commission, CommissionCreate, CommissionUpdate, CommissionPolicy]):
    async def compliment(self, db: AIOSession, *, id: ObjectId, compliment: Any) -> Commission:
        commission = await db.find_one(Commission, Commission.id == id)
        self.policy.compliment(commission=commission)
        commission.compliment = compliment
        db_obj = await db.save(commission)
        return db_obj

policy = CommissionPolicy()

commission = CRUDCommission(Commission, policy=policy)