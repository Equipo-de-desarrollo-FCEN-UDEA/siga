from app.domain.models import ApplicationType
from app.domain.schemas import ApplicationTypeUpdate, ApplicationTypeCreate
from .base import Base

class ApplicationTypePolicy(Base[ApplicationType, ApplicationTypeCreate, ApplicationTypeUpdate]):
    pass

