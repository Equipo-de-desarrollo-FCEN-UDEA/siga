from datetime import datetime

from pydantic import BaseModel


class CommissionBase(BaseModel):
    country: str
    state: str
    city: str
    start_date: datetime
    end_date: datetime
    lenguage: str
    justification: str


class CommissionCreate(CommissionBase):
    application_sub_type_id: int


class CommissionUpdate(CommissionBase):
    pass


class CommissionResponse(CommissionBase):
    pass
