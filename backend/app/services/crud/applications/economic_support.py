from typing import Any

from odmantic import ObjectId
from odmantic.session import AIOSession

from app.core.logging import get_logging

from app.domain.schemas.applications.economic_support import EconomicSupportCreate, EconomicSupportUpdate
from app.domain.models.applications.economic_support import EconomicSupport
from app.domain.policies.applications.economic_support import EconomicSupportPolicy

from .base import CRUDBase

log = get_logging(__name__)

class CRUDEconomicSupport(CRUDBase[EconomicSupport, EconomicSupportCreate, EconomicSupportUpdate, EconomicSupportPolicy]):
    pass

policy   = EconomicSupportPolicy()
economic_support = CRUDEconomicSupport(EconomicSupport, policy=policy)