from typing import Type, TypeVar, Generic
from pydantic import BaseModel

from app.domain.models import base, User

ModelType = TypeVar("ModelType", bound=base.Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


# Generamos una clase factory para crear las demás políticas
class Base(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self) -> None:
        pass

    def get(self, who: User, to: Type[ModelType]) -> None:
        pass

    def get_multi(self, who: User) -> None:
        pass

    def create(self, who: User, to: Type[CreateSchemaType]) -> None:
        pass

    def update(
        self, who: User,
        to: Type[ModelType]
    ) -> None:
        pass

    def delete(self, who: User, to: Type[ModelType]) -> None:
        pass
