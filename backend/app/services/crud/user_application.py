from typing import Any
from .base import CRUDBase

from sqlalchemy.orm import Session

# Modelos
from app.domain.models import Application, UserApplication, User

# Schemas
from app.domain.schemas import UserApplicationCreate, UserApplicationUpdate

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
            response=0, # 0 = pendiente, 1 = aceptado, 2 = rechazado
            amount=0 # inicialmente el monto asignado es 0
        )
        db_obj = UserApplication(**dict(data))
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        #log.debug(f"UserApplication created: {db_obj}")
        return db_obj
       

policy = UserApplicationPolicy()
user_application = CRUDUserApplication(UserApplication, policy=UserApplicationPolicy())
