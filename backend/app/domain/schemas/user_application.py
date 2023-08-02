import json
from pydantic import BaseModel, validator

class UserApplicationBase(BaseModel):
    user_id: int
    application_id: int
    response: int
    amount: int
    document: list

    @validator("document", pre=True)
    def parse_document(cls, value):
        if isinstance(value, str):
            return json.loads(value)
        return value

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
    document: list
    
    @validator("document", pre=True)
    def parse_document(cls, value):
        if isinstance(value, str):
            return json.loads(value)
        return value

    class Config:
        orm_mode = True
    