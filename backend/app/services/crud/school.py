from typing import List

from sqlalchemy.orm import Session

from app.domain.schemas import SchoolUpdate, SchoolCreate
from app.domain.models import School, User
from app.domain.policies import SchoolPolicy
from .base import CRUDBase


class CRUDSchool(CRUDBase[School, SchoolCreate, SchoolUpdate, SchoolPolicy]):
    def get_multi_intern(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[School]:
        self.policy.get_multi(who=who)
        #scope = who.rol.scope
        scope = who.userrol[0].rol.scope
        if scope <= 3:
            db_objs = db.query(School).offset(skip).limit(limit).all()
        else:
            db_objs = db.\
                query(School).\
                filter(School.id == who.department.school_id).\
                all()
        return db_objs

    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[School]:
        db_objs = db.\
            query(School).\
            filter(School.name != 'ADMIN').\
            offset(skip).\
            limit(limit).\
            all()
        return db_objs


policy = SchoolPolicy()

school = CRUDSchool(School, policy=policy)
