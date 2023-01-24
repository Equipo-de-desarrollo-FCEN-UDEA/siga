from pydantic import BaseModel

from .school import SchoolResponse


class DepartmentBase(BaseModel):
    name: str
    description: str
    coord_email: str
    school_id: int
    cost_center: int | None

class DepartmentCreate(DepartmentBase):
    pass


class DeparmentUpdate(DepartmentBase):
    pass


class DeparmentInDB(DepartmentBase):
    id: int

    class Config:
        orm_mode = True


class DepartmentResponse(DeparmentInDB):
    school: SchoolResponse