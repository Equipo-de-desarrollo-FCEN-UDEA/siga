from app.domain.schemas.department import DeparmentUpdate, DepartmentCreate
from app.domain.models.department import Department
from .base import Base

class DepartmentPolicy(Base[Department, DepartmentCreate, DeparmentUpdate]):
    pass