from pydantic import BaseModel


class RolBase(BaseModel):
    name: str
    description: str
    


class RolCreate(RolBase):
    scope: int
    pass


class RolUpdate(RolBase):
    pass


class RolInDBBase(RolBase):
    id: int

    class Config:
        orm_mode = True


class RolResponse(RolInDBBase):
    pass


class RolInDB(RolInDBBase):
    scope: int