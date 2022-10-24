from datetime import datetime, timedelta, timezone
from typing import Optional

from pydantic import BaseModel, Field, validator, EmailStr, SecretStr

from app.core.logging import get_logging

log = get_logging(__name__)

regex = "^[A-Z]*$"


class UserBase(BaseModel):
    primerApellido: str = Field(
        regex="^[A-Z ]*",
        min_length=3,
        max_length=20,
    )

    segundoApellido: str = Field(
        regex=regex,
        min_length=3,
        max_length=20
    )

    primerNombre: str = Field(
        regex=regex,
        min_length=3,
        max_length=20
    )

    otrosNombres: Optional[str] = Field(
        regex="^[A-Z ]*",
        min_length=3,
        max_length=50
    )

    pais: str = Field(
        regex="^[A-Z ]*",
        min_length=3,
        max_length=50
    )

    numeroIdentificacion: str = Field(
        regex="^[A-Za-z0-9-]*$",
        min_length=1,
        max_length=20
    )

    fechaIngreso: datetime
    # area_id: int = Field(
    #     gt=0
    # )
    activo: Optional[bool] = True
    is_superuser: Optional[bool] = False


class UserCreate(UserBase):
    # correo: Optional[EmailStr]

    @validator('fechaIngreso')
    def mes_antes(cls, v: datetime):
        log.debug('Estoy dentro de mes_antes')
        if not (datetime.now(timezone.utc) - timedelta(days=30) < v.astimezone()):
            raise ValueError(
                "El user no se puede registar con más de un mes de ingresado")
        return v
    password: Optional[str]

    @validator('password', always=True)
    def generate_password(cls, v, values, **kwargs):
        if not v:
            if not 'numeroIdentificacion' in values:
                raise ValueError
            return values['numeroIdentificacion']
        return v

class UserUpdate(UserBase):
    pass


class UserInDBBase(UserBase):
    id: int
    correo: EmailStr
    activo: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True


class UserResponse(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    hashed_password: SecretStr
