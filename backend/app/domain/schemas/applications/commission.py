from typing import Any
from datetime import datetime

from pydantic import BaseModel, validator, Field

from app.domain.schemas.application import ApplicationResponse


class CommissionBase(BaseModel):
    country: str
    state: str | None
    city: str | None
    start_date: datetime
    end_date: datetime
    lenguage: str | None
    justification: str = Field(max_length=500, min_length=30)
    documents: list[Any] | None
    



class CommissionCreate(CommissionBase):
    application_sub_type_id: int = Field(gt=0, lt=100)

    #@validator("application_sub_type_id")
    #def validate(cls, v, values, **kwargs):
    #    if not (v in [8,9]): # 8: Comisión de servicios y 9 comisión de estudios
    #        raise ValueError("El sub tipo no corresponde a la solicitud")
    #    return v


class CommissionUpdate(CommissionBase):
    application_sub_type_id: int


class Compliment(BaseModel):
    documents: list[Any]
    emails: list[str]
    observation: str = Field(max_length=300)


class commissionInDB(CommissionBase):
    resolution: str | None
    compliment: Compliment | None


class CommissionResponse(ApplicationResponse):
    commission: commissionInDB


class CommissionDocument(commissionInDB):
    @validator("start_date", 'end_date')
    def stringdate(cls, v, values, **kwargs):
        return v.strftime("%A %d de %B del %Y")


