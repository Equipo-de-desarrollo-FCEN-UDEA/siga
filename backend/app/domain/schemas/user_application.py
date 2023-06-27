from pydantic import BaseModel, Field

class UserApplicationBase(BaseModel):
    user_id: int
    application_id: int
    response: int
    amount: int

class UserApplicationCreate(UserApplicationBase):
    pass

class UserApplicationUpdate(UserApplicationBase):
    pass

class UserApplicationInDB(UserApplicationBase):
    id: int

    class Config:
        orm_mode = True

class UserApplicationResponse(BaseModel):
    application_id: int
    user_id: int
    response: int
    amount: int

    class Config:
        orm_mode = True
    