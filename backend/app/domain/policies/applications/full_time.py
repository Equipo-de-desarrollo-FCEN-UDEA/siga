
from datetime import datetime

# Local Imports
from app.domain.models import FullTime
from app.domain.schemas import FullTimeCreate, FullTimeUpdate
from app.domain.policies.base import Base


class FullTimePolicy(Base[FullTime, FullTimeCreate, FullTimeUpdate]):
    pass