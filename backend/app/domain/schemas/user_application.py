from pydantic import BaseModel, Field

class UserApplicationBase(BaseModel):
    user_id: int
    application_id: int
    response: int
    amout: int

class UserApplicationCreate(UserApplicationBase):
    pass

class UserApplicationUpdate(UserApplicationBase):
    pass

class UserApplicationInDB(UserApplicationBase):
    id: int

    class Config:
        orm_mode = True

class UserApplicationResponse(BaseModel):
    user_id: int
    application_id: int
    response: int
    amout: int

    class Config:
        orm_mode = True
    