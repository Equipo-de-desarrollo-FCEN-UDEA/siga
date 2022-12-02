from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, Field, validator, SecretStr

from .department import DepartmentResponse
from app.core.logging import get_logging
from .rol import RolResponse

log = get_logging(__name__)

regex = "^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$"


class UserBase(BaseModel):
    last_names: str = Field(
        regex=regex,
        min_length=3,
        max_length=50,
        
    )

    names: str = Field(
        regex=regex,
        min_length=3,
        max_length=50
    )

    identification_number: str = Field(
        regex="^[A-Z0-9]*$",
        min_length=3,
        max_length=20
    )

    email: str = Field(
        regex="^([a-zA-Z]+(.[a-zA-Z]+)+)@udea.edu.co$",
        min_length=1,
        max_length=100
    )

    identification_type: Optional[str] = Field(
        regex=regex,
        min_length=1,
        max_length=10,
        default="CC"
    )
    active: bool = False
    scale: str = Field(max_length=50)
    phone: Optional[str] = Field(max_length=50)
    office: Optional[str] = Field(max_length=5)
    vinculation_type: str = Field(max_length=50)
    department_id: int = Field(gt=0)
    rol_id: int = Field(gt=0)


class UserCreate(UserBase):
    password: Optional[str]

    @validator('password', always=True)
    def generate_password(cls, v, values, **kwargs):
        if not v:
            if not 'identification_number' in values:
                raise ValueError("No tiene número de identificación")
            return values['identification_number']
        return v
    
    # We force upper case for search engine optimization
    @validator('names', 'last_names', 'identification_number', 'email')
    def convert_upper(cls, value):
        return value.upper()


class UserUpdate(UserBase):
    pass


class UserInDBBase(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


class UserResponse(UserInDBBase):
    department: Optional[DepartmentResponse]
    email: str
    rol: RolResponse


class UserInDB(UserInDBBase):
    hashed_password: SecretStr
