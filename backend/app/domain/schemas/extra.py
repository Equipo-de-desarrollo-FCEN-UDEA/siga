from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field

from .department import DepartmentResponse
from app.core.logging import get_logging
from .user import UserResponse

log = get_logging(__name__)

regex = "^[A-Za-zÁÉÍÓÚáéíóúñÑ ]*$"

class ExtraBase(BaseModel):
    CCRG_code: str = Field(
        min_length=3,
        max_length=15,
        
    )

    name: str = Field(
        min_length=3,
        max_length=50
    )

    area: str = Field(
        min_length=3,
        max_length=50
    )

    department_id: int = Field(gt=0)
    coordinador_id: int = Field(gt=0)

### REVISAR ESTA PARTE.
class ExtraCreate(ExtraBase):
    pass

class ExtraUpdate(ExtraBase):
    pass

class ExtraInDBBase(ExtraBase):
    id: int

    class Config:
        orm_mode = True

class ExtraResponse(ExtraInDBBase):
    department: Optional[DepartmentResponse]
    coordinador: UserResponse
