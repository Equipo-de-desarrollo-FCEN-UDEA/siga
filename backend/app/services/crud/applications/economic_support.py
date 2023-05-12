from typing import List
from app.core.logging import get_logging
from odmantic.session import AIOSession
from sqlalchemy.orm import Session
from bson.objectid import ObjectId

from app.core.logging import get_logging


from app.domain.schemas.applications.economic_support import EconomicSupportCreate, EconomicSupportUpdate
from app.domain.models import EconomicSupport, User
from app.domain.policies.applications.economic_support import EconomicSupportPolicy

from .base import CRUDBase

log = get_logging(__name__)

class CRUDEconomicSupport(CRUDBase[EconomicSupport, EconomicSupportCreate, EconomicSupportUpdate, EconomicSupportPolicy]):

    # ---------- CREATE ECONOMIC SUPPORT ----------
    # Si es estudiante de pregrado no puede pedir a posgrado
    async def create(
        self,
        db: Session,
        who: User,
        application_sub_type_id: int,
        obj_in: EconomicSupport,
    ) -> EconomicSupport:

        
        self.policy.create(who=who,application_sub_type_id=application_sub_type_id)

        log.debug('salio de la policy', obj_in)
    
        return await db.save(obj_in)

policy   = EconomicSupportPolicy()
economic_support = CRUDEconomicSupport(EconomicSupport, policy=policy)