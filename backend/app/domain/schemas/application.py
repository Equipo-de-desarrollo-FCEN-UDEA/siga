from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel

from .application_subtype import ApplicationSubTypeInside
from .application_status import Application_statusResponse
from .user import UserResponse


class ApplicationBase(BaseModel):
    mongo_id: int
    applicationSubType_id: int
    user_id: int


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(ApplicationBase):
    filed: bool | None


class ApplicationInDB(ApplicationUpdate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True


class ApplicationResponse(ApplicationInDB):
    applicationSubType: Optional[ApplicationSubTypeInside]
    application_status: Optional[List[Application_statusResponse]]
    user: UserResponse