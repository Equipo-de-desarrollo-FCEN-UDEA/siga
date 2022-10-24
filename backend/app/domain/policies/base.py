from typing import Any, Dict, Type, TypeVar, Generic, List, Union

from pydantic import BaseModel

from app.domain.models import base, Usuario

ModelType = TypeVar("ModelType", bound=base.Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class Base(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self) -> None:
        pass

    def get(self, who: Usuario, to: Type[ModelType]) -> None:
        pass


    def get_multi(self, who: Usuario) -> None:
        pass


    def create(self, who: Usuario, to: Type[CreateSchemaType]) -> None:
        pass


    def update(
        self, who: Usuario, 
        to: Type[ModelType]
        ) -> None:
        pass


    def delete(self, who: Usuario, to: Type[ModelType]) -> None:
        pass
