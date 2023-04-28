from app.domain.policies.base import Base

from app.domain.models.applications.economic_support import *
from app.domain.schemas.applications.economic_support import EconomicSupportCreate, EconomicSupportUpdate

class EconomicSupportPolicy(Base[EconomicSupport, EconomicSupportCreate, EconomicSupportUpdate]):
    pass