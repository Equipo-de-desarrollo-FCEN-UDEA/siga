from typing import Any, Dict, Generic, List, Optional, Type, TypeVar, Union

from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.domain.models.base import Base
from app.domain.policies import base
from app.domain.models import User

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)
Policy = TypeVar("Policy", bound=base.Base)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType, Policy]):
    def __init__(self, model: Type[ModelType], policy: Type[Policy]):
        """
        Factory para el crud
        """
        self.model = model
        self.policy = policy

    def get(self, db: Session, id: int, who: User) -> Optional[ModelType]:
        obj_db = db.query(self.model).filter(self.model.id == id).first()
        self.policy.get(who=who, to=obj_db)
        return obj_db

    def get_multi(
        self,
        db: Session,
        who: User,
        *,
        skip: int = 0,
        limit: int = 100
    ) -> List[ModelType]:
        objs_db = db.query(self.model).offset(skip).limit(limit).all()
        self.policy.get_multi(who=who)
        return objs_db

    def create(
        self,
        db: Session,
        who: User,
        *,
        obj_in: CreateSchemaType
    ) -> ModelType:
        self.policy.create(who=who, to=obj_in)
        obj_in_data = dict(obj_in)
        db_obj = self.model(**obj_in_data)  # Ignoramos el tipado
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        who: User,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        self.policy.update(who=who, to=db_obj, obj_in=obj_in)
        obj_data = db_obj.__dict__
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def delete(self, db: Session, who: User, *, id: int) -> None:
        obj_db = db.query(self.model).get(id)
        self.policy.delete(who=who, to=obj_db)
        db.delete(obj_db)
        db.commit()
