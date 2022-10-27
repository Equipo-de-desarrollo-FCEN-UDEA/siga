from datetime import datetime, timedelta, timezone
from typing import Optional

from pydantic import BaseModel, Field, validator, EmailStr, SecretStr

from app.core.logging import get_logging

log = get_logging(__name__)

regex = "^[A-Z ]*$"


class UserBase(BaseModel):
    lastNames: str = Field(
        regex=regex,
        min_length=3,
        max_length=50,
    )

    names: str = Field(
        regex=regex,
        min_length=3,
        max_length=50
    )

    identificationNumber: str = Field(
        regex="^[A-Z-0-9 ]*$",
        min_length=3,
        max_length=20
    )

    email: str = Field(
        min_length=1,
        max_length=100
    )

    active: bool = True
    scale: str = Field(max_length=50)
    phone: Optional[str] = Field(max_length=50)
    office: Optional[str] = Field(max_length=5)
    vinculationType: str = Field(max_length=50)
    department_id: int
    rol_id: int


class UserCreate(UserBase):
    password: Optional[str]

    @validator('password', always=True)
    def generate_password(cls, v, values, **kwargs):
        if not v:
            if not 'identificationNumber' in values:
                raise ValueError
            return values['identificationNumber']
        return v


class UserUpdate(UserBase):
    pass


class UserInDBBase(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


class UserResponse(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    hashed_password: SecretStr
