
from .base import CRUDBase
from app.domain.schemas.department import DeparmentUpdate, DepartmentCreate
from app.domain.models.department import Department
from app.domain.policies.deparment import DepartmentPolicy


class CRUDDepartment(CRUDBase[Department,DepartmentCreate, DeparmentUpdate, DepartmentPolicy]):
    pass

policy = DepartmentPolicy()

department = CRUDDepartment(Department, policy=policy)