from typing import Any
from datetime import datetime

from pydantic import BaseModel, validator, Field

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
    documents: Any
    signature: Any | None

class VacationCreate(VacationBase):
    application_sub_type_id: int  = Field(gt=0, lt=100)
class VacationUpdate(VacationBase):
    application_sub_type_id: int

class VacationInDB(VacationBase):
    documents: Any | None = Field(default_factory=list)

class VacationResponse(ApplicationResponse):
    vacation: VacationInDB

