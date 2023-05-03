from pydantic import BaseModel


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
    pass


class UserRolInDB(UserRolInDBBase):
    scope: int