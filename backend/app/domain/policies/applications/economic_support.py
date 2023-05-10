from app.domain.policies.base import Base

from app.domain.models.applications.economic_support import *
from app.domain.schemas.applications.economic_support import EconomicSupportCreate, EconomicSupportUpdate

from app.domain.errors.applications.economic_support import *

from app.core.logging import get_logging

from app.domain.models.user import User


log = get_logging(__name__)
class EconomicSupportPolicy(Base[EconomicSupport, EconomicSupportCreate, EconomicSupportUpdate]):
    pass