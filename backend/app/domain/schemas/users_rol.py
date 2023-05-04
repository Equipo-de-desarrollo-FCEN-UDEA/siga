from pydantic import BaseModel
from .rol import RolResponse

class UserRolBase(BaseModel):
    rol_id: int
    user_id: int
    


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
    pass


class UserRolInDB(UserRolInDBBase):
    scope: int