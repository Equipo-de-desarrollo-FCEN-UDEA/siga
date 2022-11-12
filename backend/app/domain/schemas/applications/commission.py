from datetime import datetime

from pydantic import BaseModel, validator, Field

from app.domain.schemas.application import ApplicationResponse


class CommissionBase(BaseModel):
    country: str
    state: str
    city: str
    start_date: datetime
    end_date: datetime
    lenguage: str
    justification: str


class CommissionCreate(CommissionBase):
    application_sub_type_id: int = Field(gt=0, lt=100)

    #@validator("application_sub_type_id")
    #def validate(cls, v, values, **kwargs):
    #    if not (v in [8,9]): # 8: Comisión de servicios y 9 comisión de estudios
    #        raise ValueError("El sub tipo no corresponde a la solicitud")
    #    return v


class CommissionUpdate(CommissionBase):
    pass


class CommissionResponse(ApplicationResponse):
    commission: CommissionBase
