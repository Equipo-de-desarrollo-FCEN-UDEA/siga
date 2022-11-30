from app.domain.models import Status, User
from app.domain.schemas import StatusCreate, StatusUpdate
from .base import Base

class StatusPolicy(Base[Status, StatusCreate, StatusUpdate]):
    
    def __init__(self) -> None:
        pass

    def get_multi(self, who: User) -> None:
        pass
