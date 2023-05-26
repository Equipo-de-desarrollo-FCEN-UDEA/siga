from typing import List
from app.core.logging import get_logging
from odmantic.session import AIOSession
from sqlalchemy.orm import Session
from bson.objectid import ObjectId
import zipfile
import io


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
    
    async def create_format(self, db: AIOSession, *, id: ObjectId, name: str, path: str) -> None:
        economic_support = await db.find_one(EconomicSupport, EconomicSupport.id == id)
        log.debug(economic_support.dict())
        # for i, document in enumerate(economic_support.documents):
        #     if document['name'] == name:
        #         del economic_support.documents[i]
        if economic_support.documents is not None:
            economic_support.documents += [{'name': name, 'path': path}]
        else:
            economic_support.documents = [{'name': name, 'path': path}]
        await db.save(economic_support)
        return None



policy   = EconomicSupportPolicy()
economic_support = CRUDEconomicSupport(EconomicSupport, policy=policy)