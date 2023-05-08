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
    pass

policy   = EconomicSupportPolicy()
economic_support = CRUDEconomicSupport(EconomicSupport, policy=policy)