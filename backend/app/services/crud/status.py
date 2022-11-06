from app.domain.schemas import StatusCreate, SchoolUpdate
from app.domain.models import Status
from app.domain.policies import StatusPolicy
from app.domain.schemas.status import StatusUpdate
from .base import CRUDBase


class CRUDStatus(CRUDBase[Status, StatusCreate, StatusUpdate, StatusPolicy]):
    pass

policy = StatusPolicy()

status = CRUDStatus(Status, policy=policy)