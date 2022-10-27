from pydantic import BaseModel

class DepartmentBase(BaseModel):
    name: str
    description: str
    coordEmail: str
    school_id: int


class DepartmentCreate(DepartmentBase):
    pass


class DeparmentUpdate(DepartmentBase):
    pass


class DeparmentInDB(DepartmentBase):
    id: int

    class Config:
        orm_mode = True