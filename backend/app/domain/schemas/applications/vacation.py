from typing import Any
from datetime import datetime

from pydantic import BaseModel, Field, validator

from app.domain.schemas.application import ApplicationResponse
class VacationBase(BaseModel):
    total_days: int
    start_date: datetime
    end_date: datetime
    documents: list[Any]
    signature: str

class VacationCreate(VacationBase):
    application_sub_type_id: int 
class VacationUpdate(VacationBase):
    application_sub_type_id: int

class VacationInDB(VacationBase):
    #documents: list[Any] | None = Field(default_factory=list)
    resolution: str | None
    
class VacationResponse(ApplicationResponse):
    vacation: VacationInDB

class VacationDocument(VacationBase):
    @validator("start_date", 'end_date')
    def stringdate(cls, v, values, **kwargs):
        return v.strftime("%A %d de %B del %Y")

