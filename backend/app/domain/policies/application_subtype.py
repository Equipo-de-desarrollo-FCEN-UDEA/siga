from app.domain.models import ApplicationSubType
from app.domain.schemas import ApplicationSubTypeUpdate, ApplicationSubTypeCreate
from .base import Base

class ApplicationSubTypePolicy(Base[ApplicationSubType, ApplicationSubTypeCreate, ApplicationSubTypeUpdate]):
    pass

