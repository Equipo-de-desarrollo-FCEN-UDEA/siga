import json

from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field, validator

from .status import StatusInDB


class Application_statusBase(BaseModel):
    application_id: int
    status_id: int
    observation: Optional[str] = Field(max_length=200)
    amount_approved: Optional[int] = Field(ge=0, le=1000000000)
    document: Optional[list]

    @validator("document", pre=True)
    def parse_document(cls, value):
        if isinstance(value, str):
            return json.loads(value)
        return value

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
    document: Optional[list]
    created_at: datetime #No puede ser opcional, cambiar luego
    status: Optional[StatusInDB]

    class Config:
        orm_mode = True