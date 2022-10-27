from app.domain.schemas.school import SchoolUpdate, SchoolCreate
from app.domain.models.school import School
from app.domain.policies.school import SchoolPolicy
from .base import CRUDBase


class CRUDSchool(CRUDBase[School, SchoolCreate, SchoolUpdate, SchoolPolicy]):
    pass

policy = SchoolPolicy()

school = CRUDSchool(School, policy=policy)