from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field

from .status import StatusInDB


class Application_statusBase(BaseModel):
    application_id: int
    status_id: int
    observation: Optional[str] = Field(max_length=200)
    amount_approved: Optional[int] = Field(ge=0, le=1000000000)


class Application_statusCreate(Application_statusBase):
    pass


class Application_statusUpdate(Application_statusBase):
    pass


class Application_statusInDB(Application_statusBase):
    id: int
    created_at: Optional[datetime]

    class Config:
        orm_mode = True

class Application_statusResponse(BaseModel):
    observation: str
    amount_approved: Optional[int]
    created_at: datetime #No puede ser opcional, cambiar luego
    status: Optional[StatusInDB]

    class Config:
        orm_mode = True