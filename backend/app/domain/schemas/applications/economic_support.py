from typing import Any
from datetime import datetime

from pydantic import BaseModel, validator, Field

from app.domain.schemas.application import ApplicationResponse

class Budget(BaseModel):
    description: str = Field(min_length=2, max_length=50)
    amount: int

class EconomicSupportBase(BaseModel):
    start_date: datetime
    end_date: datetime
    country: str
    justification: str = Field(max_length=500, min_length=5)
    support: Any
    budget: list[Budget]
    documents: list[Any]

    state: str | None
    city: str | None
    lenguage: str | None


class EconomicSupportCreate(EconomicSupportBase):
    application_sub_type_id: int = 14

class EconomicSupportUpdate(EconomicSupportBase):
    application_sub_type_id: int = 14

class EconomicSupportInDB(EconomicSupportBase):
    documents: list[Any]

class EconomicSupportResponse(ApplicationResponse):
    economic_support: EconomicSupportInDB

class EconomicSupportDocument(EconomicSupportInDB):
    @validator("start_date", 'end_date')
    def stringdate(cls, v, values, **kwargs):
        return v.strftime("%A %d de %B del %Y")