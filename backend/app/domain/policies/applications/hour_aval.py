from app.domain.models import HourAval
from app.domain.schemas import HourAvalCreate, HourAvalUpdate
from app.domain.policies.base import Base


class HourAvalPolicy(Base[HourAval, HourAvalCreate, HourAvalUpdate]):
    pass