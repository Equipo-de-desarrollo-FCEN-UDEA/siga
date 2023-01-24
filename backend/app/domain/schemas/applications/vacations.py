from typing import Any
from datetime import datetime

from pydantic import BaseModel, validator, Field

from app.domain.schemas.application import ApplicationResponse

class Applicant(BaseModel):
    identification_error: str
    names: str
    last_names: str
    email: str

class VacationsBase(BaseModel):
    vinculation_type: str
    service_type: str
    vacations_type: bool
    start_date: datetime
    end_date: datetime
    justification: str
    resolution: str | None
    documents: list[Any] | None

class VacationCreate(VacationsBase):
    pass

class VacationUpdate(VacationsBase):
    pass

class VacationInDB(VacationsBase):
    pass

class VacationResponse(ApplicationResponse):
    pass

