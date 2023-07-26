from typing import List

from sqlalchemy.orm import Session

from .base import CRUDBase
from app.domain.schemas import DeparmentUpdate, DepartmentCreate
from app.domain.models import Department, User
from app.domain.policies import DepartmentPolicy


class CRUDDepartment(CRUDBase[Department, DepartmentCreate, DeparmentUpdate, DepartmentPolicy]):
    def get_multi_intern(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[Department]:
        self.policy.get_multi(who=who)
        #scope = who.rol.scope
        scope = who.userrol[0].rol.scope
        if scope <= 3:
            db_objs = db.query(Department).offset(skip).limit(limit).all()
        else:
            db_objs = db.\
                query(Department).\
                filter(Department.school_id == who.department.school_id).\
                offset(skip).\
                limit(limit).\
                all()
        return db_objs
    
    def get_multi_by_school(
        self,
        db: Session,
        *,
        id: int,
        skip: int = 0,
        limit: int = 100
    ) -> List[Department]:
        self.policy.get_multi_by_school(id=id)
        db_objs = db.\
            query(Department).\
            filter(Department.school_id == id).\
            filter(Department.name != 'DECANATURA').\
            offset(skip).\
            limit(limit).\
            all()
        return db_objs

policy = DepartmentPolicy()

department = CRUDDepartment(Department, policy=policy)
