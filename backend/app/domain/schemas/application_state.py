from typing import Optional
from datetime import datetime

from pydantic import BaseModel, Field

from .state import StateInDB


class Application_stateBase(BaseModel):
    application_id: int
    state_id: int
    observation: Optional[str] = Field(max_length=50)


class Application_stateCreate(Application_stateBase):
    pass


class Application_stateUpdate(Application_stateBase):
    pass


class Application_stateInDB(Application_stateBase):
    id: int
    created_at: Optional[datetime]

    class Config:
        orm_mode = True

class Application_stateResponse(BaseModel):
    created_at: Optional[datetime] #No puede ser opcional, cambiar luego
    state: Optional[StateInDB]

    class Config:
        orm_mode = True