from typing import List

from pydantic import BaseModel

from .application_subtype import ApplicationSubTypeInDB


class ApplicationTypeBase(BaseModel):
    name: str
    description: str


class ApplicationTypeCreate(ApplicationTypeBase):
    pass


class ApplicationTypeUpdate(ApplicationTypeBase):
    pass


class ApplicationTypeInDB(ApplicationTypeBase):
    id: int

    class Config:
        orm_mode = True


class ApplicationTypeResponse(ApplicationTypeInDB):
    applicationSubType: List[ApplicationSubTypeInDB]