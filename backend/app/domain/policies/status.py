from app.domain.models import Status
from app.domain.schemas import StatusCreate, StatusUpdate
from .base import Base

class StatusPolicy(Base[Status, StatusCreate, StatusUpdate]):
    pass