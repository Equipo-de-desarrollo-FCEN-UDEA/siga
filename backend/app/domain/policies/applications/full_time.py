from datetime import datetime

from app.domain.models import FullTime
from app.domain.schemas import FullTimeCreate, FullTimeUpdate
from app.domain.policies.base import Base
from app.domain.errors.applications.full_time import *


class FullTimePolicy(Base[FullTime, FullTimeCreate, FullTimeUpdate]):
    pass