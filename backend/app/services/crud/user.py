from typing import Any, Dict, Optional, Union, List

from sqlalchemy import desc
from sqlalchemy.orm import Session

from app.domain.schemas.user import UserCreate, UserUpdate
from app.domain.models import User, Rol, Department
from app.domain.policies.user import UserPolicy
from app.services.security import get_password_hash, check_password
from app.domain.errors.user import user_diferent_password
from .base import CRUDBase
from app.core.logging import get_logging

log = get_logging(__name__)


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate, UserPolicy]):

    #
    def get_middleware(
        self, db: Session, id: int
    ) -> Optional[User]:
        obj_db = db.query(User).filter(User.id == id).first()
        return obj_db

    #
    def get_by_email(
        self, db: Session, email: str
    ) -> User:
        email = email.upper()
        obj_db = db.query(User).filter(User.email == email).first()
        return obj_db

    #
    def get_by_identification(
        self, db: Session, identification: str
    ) -> User:
        identification = identification.upper()
        obj_db = db.query(User).filter(
            User.identification_number == identification).first()
        return obj_db

    #
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
        queries = [User.active == active, Rol.scope >= who.rol.scope]

        if who.rol.scope == 7:
            queries += [Department.id == who.department.id]

        if who.rol.scope == 5:
            queries += [Department.school_id == who.department.school_id]

        if search:
            columns = [
                'names',
                'last_names',
                'identification_number',
                'email'
            ]
            search = search.upper()
            raw = [
                db.query(User)
                .order_by(desc(User.id))
                .join(Rol)
                .join(Department)
                .filter(getattr(User, col).contains(f"{search}"))
                .filter(*queries)
                .all()
                for col in columns
            ]
            res = [user for users in raw for user in users]
            return [*set(res)]

        objs_db = (db.query(User)
                   .order_by(desc(User.id))
                   .join(Rol)
                   .join(Department)
                   .filter(*queries)
                   .offset(skip)
                   .limit(limit)
                   .all())

        return objs_db

    # No debe ser expuesta en ningún momento, se hace para uso interno de la aplicación

    def create(
        self,
        db: Session,
        obj_in: UserCreate
    ) -> User:
        user: User = self.get_by_identification(
            db, identification=obj_in.identification_number) or self.get_by_email(db=db, email=obj_in.email)
        self.policy.create(to=user)
        hashed_password = get_password_hash(obj_in.password)
        data = dict(obj_in)
        del data['password']
        data['hashed_password'] = hashed_password
        db_obj = User(**data)
        self.policy.create(to=user)
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
        user: User = self.get_by_email(db, email=email) or self.get_by_identification(
            db, identification=identification)
        if not check_password(password, user.hashed_password):
            raise user_diferent_password
        self.policy.authenticate(who=user)
        return user

    def is_active(self, db: Session, *, user: User) -> bool:
        return user.active


policy = UserPolicy()

user = CRUDUser(User, policy=policy)
