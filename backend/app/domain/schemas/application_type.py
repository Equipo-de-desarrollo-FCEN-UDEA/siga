from typing import List, Any, Optional

from pydantic import BaseModel


class StatusFlux(BaseModel):
    status: str
    scope: list[int]


class ApplicationTypeBase(BaseModel):
    name: str
    description: str
    status_flux: list[StatusFlux]
    who_can: list[int]


class ApplicationTypeCreate(ApplicationTypeBase):
    pass


class ApplicationTypeUpdate(ApplicationTypeBase):
    pass


class ApplicationTypeInDB(ApplicationTypeBase):
    id: int

    class Config:
        orm_mode = True


class ApplicationTypeResponse(ApplicationTypeInDB):
    application_sub_type: Optional[List[Any]]
