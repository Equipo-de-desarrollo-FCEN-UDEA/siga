from pydantic import BaseModel
from .rol import RolResponse
from typing import Optional


class UserRolBase(BaseModel):
    rol_id: int
    user_id: int
    description: Optional[str]
    


class UserRolCreate(UserRolBase):
    pass


class UserRolUpdate(UserRolBase):
    pass


class UserRolInDBBase(UserRolBase):
    id: int

    class Config:
        orm_mode = True


class UserRolResponse(UserRolInDBBase):
    rol: RolResponse


class UserRolInDB(UserRolInDBBase):
    scope: int
    