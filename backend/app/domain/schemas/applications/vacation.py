from typing import Any
from datetime import datetime

from pydantic import BaseModel, Field

from app.domain.schemas.application import ApplicationResponse

class Applicant(BaseModel):
    identification_error: str
    names: str
    last_names: str
    email: str

class VacationBase(BaseModel):
    total_days: int
    start_date: datetime
    end_date: datetime
    documents: list[Any] | None = Field(default_factory=list)
    signature: Any | None

class VacationCreate(VacationBase):
    application_sub_type_id: int 
class VacationUpdate(VacationBase):
    application_sub_type_id: int

class VacationInDB(VacationBase):
    documents: list[Any] | None = Field(default_factory=list)
    
class VacationResponse(ApplicationResponse):
    vacation: VacationInDB

