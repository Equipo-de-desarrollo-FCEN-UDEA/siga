from typing import Any, Optional

from pydantic import BaseModel

from .application_type import ApplicationTypeInDB


class ApplicationSubTypeBase(BaseModel):
    name: str
    application_type_id: int
    extra: Optional[Any]


class ApplicationSubTypeCreate(ApplicationSubTypeBase):
    pass


class ApplicationSubTypeUpdate(ApplicationSubTypeBase):
    pass


class ApplicationSubTypeInDB(ApplicationSubTypeBase):
    id: int

    class Config:
        orm_mode = True


class ApplicationSubTypeInside(ApplicationSubTypeInDB):
    application_type: Optional[ApplicationTypeInDB]