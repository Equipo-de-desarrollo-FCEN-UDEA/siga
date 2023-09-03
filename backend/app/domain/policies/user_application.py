from .base import Base

from app.domain.schemas import UserApplicationCreate, UserApplicationUpdate
from app.domain.models import UserApplication, User


class UserApplicationPolicy(Base[UserApplication, UserApplicationCreate, UserApplicationUpdate]):
    def create_by_coordinator(
        self,
        who: User,
        to: UserApplication,
    ) :
        pass