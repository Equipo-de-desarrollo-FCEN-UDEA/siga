from typing import Any
from datetime import datetime

from pydantic import BaseModel, validator, Field

from app.domain.schemas.application import ApplicationResponse

class ReportFullTimeBase(BaseModel):
    from_full_time: bool
    full_time_id: int
    documents: list[Any] | None = Field(default_factory=list)

class ReportFullTimeCreate(ReportFullTimeBase):
    application_sub_type_id: int = 15

class ReportFullTimeUpdate(ReportFullTimeBase):
    application_sub_type_id: int = 15

class ReportFullTimeInDB(ReportFullTimeBase):
    pass

class ReportFullTimeResponse(ApplicationResponse):
    report_full_time: ReportFullTimeInDB