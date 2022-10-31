from typing import Any, Dict, Optional, Union, List

from sqlalchemy.orm import Session, joinedload

from app.domain.schemas.user import UserCreate, UserUpdate
from app.domain.models import User
from app.domain.policies.user import UserPolicy
from app.services.security import get_password_hash, check_password
from app.domain.errors.user import User401, User404, UserRegistrado
from .base import CRUDBase
from app.core.logging import get_logging

log = get_logging(__name__)


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate, UserPolicy]):
    def get_middleware(
        self, db: Session, id: int
    ) -> Optional[User]:
        obj_db = db.query(User).filter(User.id == id).first()
        return obj_db

    def get_by_email(
        self, db: Session, email: str
    ) -> User:
        obj_db = db.query(User).filter(User.email == email).first()
        return obj_db

    def get_by_identificacion(
        self, db: Session, identification: str
    ) -> User:
        obj_db = db.query(User).filter(
            User.identificationNumber == identification).first()
        return obj_db

    def get_multi(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100,
        search: str | None = '',
        active: bool = True,
    ) -> List[User]:
        self.policy.get_multi(who=who)
        columns = [
            'names',
            'lastNames',
            'identificationNumber',
            'email'
        ]
        if search:
            search = search.upper()
            raw = [
                db.query(User).filter(
                    getattr(User, col).contains(f"{search}")).filter(User.active == active).all()
                for col in columns
            ]
            res = [user for users in raw for user in users]
            return res

        objs_db = db.query(User)\
            .filter(User.active == active)\
            .offset(skip)\
            .limit(limit)\
            .all()

        return objs_db

    # No debe ser expuesta en ningún momento, se hace para uso interno de la aplicación

    def create(
        self,
        db: Session,
        obj_in: UserCreate
    ) -> User:
        self.policy.create()
        hashed_password = get_password_hash(obj_in.password)
        data = dict(obj_in)
        del data['password']
        data['hashed_password'] = hashed_password
        db_obj = User(**data)
        user: User = self.get_by_identificacion(
            db, identification=obj_in.identificationNumber)
        if user:
            raise UserRegistrado
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, who: User, *, db_obj: User, obj_in: Union[UserUpdate, Dict[str, Any]]) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        return super().update(db, db_obj=db_obj, who=who, obj_in=update_data)

    def update_password(
        self,
        db: Session,
        password: str,
        confirmPassword: str,
        db_obj: User,
        who: User
    ) -> User:
        self.policy.update_password(
            who=who, to=db_obj, password=password, confirmpassword=confirmPassword
        )
        update_data = {
            "hashed_password": get_password_hash(password)
        }
        return super().update(db=db, who=who, db_obj=db_obj, obj_in=update_data)

    def authenticate(
        self,
        db: Session,
        *,
        email: str = None,
        identification: str = None,
        password: str
    ) -> User:
        user: User = self.get_by_email(db, email=email) or self.get_by_identificacion(
            db, identification=identification)
        if not user:
            raise User404
        if not user.active:
            raise User404
        if not check_password(password, user.hashed_password):
            raise User401
        return user

    def is_active(self, db: Session, *, user: User) -> bool:
        return user.active


policy = UserPolicy()

user = CRUDUser(User, policy=policy)
