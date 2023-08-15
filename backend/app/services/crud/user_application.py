from typing import Any
from .base import CRUDBase
from typing import Any, Dict, Union

from sqlalchemy.orm import Session

# Modelos
from app.domain.models import Application, UserApplication, User

# Schemas
from app.domain.schemas import UserApplicationCreate, UserApplicationUpdate, UserApplicationResponse

# Políticas
from app.domain.policies import UserApplicationPolicy

from app.core.logging import get_logging

log = get_logging(__name__)


class CRUDUserApplication(CRUDBase[UserApplication, UserApplicationCreate, UserApplicationUpdate, UserApplicationPolicy]):
    def create(
        self,
        db: Session,
        who: User,
        *,
        obj_in: Application,
    ) -> UserApplication:
        data = UserApplicationCreate(
            user_id=who.id,
            application_id=obj_in.id,
            response=0,  # 0 = pendiente, 1 = aceptado, 2 = rechazado
            amount=0,  # inicialmente el monto asignado es 0
            document=['']  # inicialmente no se sube ningún documento
        )
        db_obj = UserApplication(**dict(data))
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        # log.debug(f"UserApplication created: {db_obj}")
        return db_obj

    def get_by_coordinator(
        self,
        db: Session,
        who: User,
        *,
        id: int,
    ):
        return db.query(UserApplication).filter(
            UserApplication.user_id == who.id,
            UserApplication.application_id == id).first()

    def get_user_application(
        self,
        db: Session,
        *,
        id: int,
    ) -> list[UserApplication]:
        db_obj = db.query(UserApplication).filter(
            UserApplication.application_id == id).all()
        log.debug(f"UserApplication: {db_obj}")
        return db_obj

    def update_by_coordinator(
        self,
        db: Session,
        who: User,
        id: int,
        *,
        db_obj: UserApplication,
        obj_in: Union[UserApplicationUpdate, Dict[str, Any]],
    ) -> UserApplication:
        db_obj = super().update(db, who, db_obj=db_obj, obj_in=obj_in)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


    def delete(
        self,
        db: Session,
        who: User,
        id: int,
    ):
        db_objs = db.query(UserApplication).filter(
            UserApplication.application_id == id).all()

        for db_obj in db_objs:
            super().delete(db, who, id=db_obj.id)

        db.commit()  # Commit outside the loop
        return len(db_objs)  # Return the number of deleted objects


policy = UserApplicationPolicy()
user_application = CRUDUserApplication(
    UserApplication, policy=UserApplicationPolicy())
