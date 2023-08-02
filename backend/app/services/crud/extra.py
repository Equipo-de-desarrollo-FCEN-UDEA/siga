from typing import List

from sqlalchemy.orm import Session

from .base import CRUDBase
from app.domain.schemas import ExtraUpdate, ExtraCreate
from app.domain.models import Extra, Department, User
from app.domain.policies import ExtraPolicy
from app.core.logging import get_logging

log = get_logging(__name__)


class CRUDExtra(CRUDBase[Extra, ExtraCreate, ExtraUpdate, ExtraPolicy]):

    def get_multi_intern(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[Department]:
        self.policy.get_multi(who=who)
        scope = who.userrol[who.active_rol].rol.scope
        if scope <= 3:
            db_objs = db.query(Extra).offset(skip).limit(limit).all()
        else:
            db_objs = db.\
                query(Extra).\
                offset(skip).\
                limit(limit).\
                all()
            # filter(Extra.department_id == who.department.id).\
            log.debug(db_objs)
        return db_objs

    def get_by_department(
            self,
            db: Session,
            who: User,
            *,
            department_id: int,
    ):
        return db.query(Extra).filter(Extra.department_id == department_id).all()


policy = ExtraPolicy()
extra = CRUDExtra(Extra, policy=policy)
