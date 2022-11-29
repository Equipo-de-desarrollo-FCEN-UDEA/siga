from typing import Generic, TypeVar, Type, List

from odmantic import Model, ObjectId
from odmantic.session import AIOSession
from pydantic import BaseModel

from app.domain.policies import base

ModelType = TypeVar("ModelType", bound=Model)
UpdateSchema = TypeVar("UpdateSchema", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
Policy = TypeVar("Policy", bound=base.Base)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchema, Policy]):
    def __init__(self, model: Type[ModelType], policy: Type[Policy]):
        """Factory crud with odm"""
        self.model = model
        self.policy = policy

    async def get(self, db: AIOSession,
                  *, id: ObjectId) -> Type[ModelType]:

        return await db.find_one(self.model, self.model.id == id)

    async def create(self, db: AIOSession,
                     *, obj_in: Type[ModelType]) -> Type[ModelType]:
        return await db.save(obj_in)

    async def update(
        self,
        db: AIOSession,
        *,
        db_obj: Type[ModelType],
        obj_in: Type[UpdateSchema]
    ) -> Type[ModelType]:
        db_obj.update(obj_in)
        return await db.save(db_obj)

    async def delete(self, db: AIOSession, *, id: ObjectId) -> Type[ModelType]:
        db_obj = await db.find_one(self.model, self.model.id == id)
        return await db.delete(db_obj)
