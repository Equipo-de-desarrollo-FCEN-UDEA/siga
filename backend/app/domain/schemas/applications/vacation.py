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
    type_date_application: int
    total_days: int
    start_date: datetime
    end_date: datetime
    documents: list[Any] | None
    signature: Any | None

class VacationCreate(VacationBase):
    application_sub_type_id: int = 12
class VacationUpdate(VacationBase):
    application_sub_type_id: int = 12

class VacationInDB(VacationBase):
    documents: list[Any] | None = Field(default_factory=list)

class VacationResponse(ApplicationResponse):
    vacation: VacationInDB

