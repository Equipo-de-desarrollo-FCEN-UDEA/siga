from typing import Any, Optional

from pydantic import BaseModel

from .application_type import ApplicationTypeInDB


class ApplicationSubTypeBase(BaseModel):
    name: str
    applicationType_id: int
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
    applicationType: Optional[ApplicationTypeInDB]