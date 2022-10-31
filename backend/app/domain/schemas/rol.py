from pydantic import BaseModel


class RolBase(BaseModel):
    name: str
    description: str
    scope: int


class RolCreate(RolBase):
    pass


class RolUpdate(RolBase):
    pass


class RolInDB(RolBase):
    id: int

    class Config:
        orm_mode = True
