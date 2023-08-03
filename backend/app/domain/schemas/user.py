from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, Field, validator, SecretStr

from .department import DepartmentResponse
from app.core.logging import get_logging
#from .rol import RolResponse
from .userrol import UserRolResponse

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
        # regex="^([a-zA-Z]+(.[a-zA-Z]+)+)@udea.edu.co$",
        min_length=1,
        max_length=100
    )

    identification_type: Optional[str] = Field(
        regex=regex,
        min_length=1,
        max_length=100,
        default="CC"
    )
    active: bool = False
    scale: str = Field(max_length=50)
    phone: Optional[str] = Field(max_length=50)
    office: Optional[str] = Field(max_length=5)
    vinculation_type: str = Field(max_length=50)
    department_id: int = Field(gt=0)
    active_rol: Optional[int] = Field(gt=-1, default=0)
    #rol_id: int = Field(gt=0)


class UserCreate(UserBase):
    password: Optional[str]
    rol_id : Optional[int] #Esta el la línea a comentar cuando se crea por primera vez la DB.

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
    rol_id: Optional[UserRolResponse]
    changes_rol: bool


class UserInDBBase(UserBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


class UserResponse(UserInDBBase):
    department: Optional[DepartmentResponse]
    email: str
    userrol: List[UserRolResponse]


class UserInDB(UserInDBBase):
    hashed_password: SecretStr
    userrol: List[UserRolResponse]


class UserBypass(BaseModel):
    email: str
    names: str
    last_names: str
    vinculation_type: str

    @validator('names', 'last_names')
    def cutname(cls, value):
        values = value.split(' ')
        v = ''
        for value in values:
            lenght = len(value)
            v += value[:int(lenght / 2)] + '*' * (lenght - int(lenght / 2)) + ' '
        return v[:-1]

    class Config:
        orm_mode = True