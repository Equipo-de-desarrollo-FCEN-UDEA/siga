from typing import Any
from datetime import datetime

from pydantic import BaseModel, Field, validator

from app.domain.schemas.application import ApplicationResponse
class VacationBase(BaseModel):
    total_working_days: int
    total_calendar_days: int
    start_working_date: datetime
    end_working_date: datetime
    start_calendar_date: datetime
    end_calendar_date: datetime
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
    @validator("start_working_date", "end_working_date", "start_calendar_date", "end_calendar_date")
    def stringdate(cls, v, values, **kwargs):
        return v.strftime("%A %d de %B del %Y")

