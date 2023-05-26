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
    async def create_format(self, db: AIOSession, *, id: ObjectId, name: str, path: str) -> None:
        economic_support = await db.find_one(EconomicSupport, EconomicSupport.id == id)
        log.debug(economic_support.dict())
        for i, document in enumerate(economic_support.document):
            if document['name'] == name:
                del economic_support.document[i]
        if economic_support.document is not None:
            economic_support.document += [{'name': name, 'path': path}]
        else:
            economic_support.document = [{'name': name, 'path': path}]
        await db.save(economic_support)
        return None

policy   = EconomicSupportPolicy()
economic_support = CRUDEconomicSupport(EconomicSupport, policy=policy)