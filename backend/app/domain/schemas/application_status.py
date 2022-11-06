from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field

from .status import StatusInDB


class Application_statusBase(BaseModel):
    application_id: int
    status_id: int
    observation: Optional[str] = Field(max_length=50)


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
    created_at: Optional[datetime] #No puede ser opcional, cambiar luego
    status: Optional[StatusInDB]

    class Config:
        orm_mode = True