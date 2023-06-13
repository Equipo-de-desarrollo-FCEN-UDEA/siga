from .base import Base

from app.domain.schemas import UserApplicationCreate, UserApplicationUpdate
from app.domain.models import UserApplication


class UserApplicationPolicy(Base[UserApplication, UserApplicationCreate, UserApplicationUpdate]):
    pass