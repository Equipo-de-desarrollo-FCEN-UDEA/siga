from app.domain.schemas.school import SchoolCreate, SchoolUpdate
from app.domain.models.school import School
from .base import Base

class SchoolPolicy(Base[School, SchoolCreate, SchoolUpdate]):
    pass