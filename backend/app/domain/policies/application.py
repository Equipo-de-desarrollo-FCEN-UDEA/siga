from app.domain.models import Application
from app.domain.schemas import ApplicationUpdate, ApplicationCreate
from .base import Base

class ApplicationPolicy(Base[Application, ApplicationCreate, ApplicationUpdate]):
    pass