from datetime import datetime
from typing import Optional, List, Any

from pydantic import BaseModel, validator

from .application_subtype import ApplicationSubTypeInside
from .application_status import Application_statusResponse
from .user import UserResponse


class ApplicationBase(BaseModel):
    mongo_id: Any
    application_sub_type_id: int
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


class ApplicationMultiResponse(ApplicationInDB):
    application_sub_type: Optional[ApplicationSubTypeInside]
    application_status: Optional[List[Application_statusResponse]]
    @validator('application_status')
    def last_status(cls, v, values, **kwargs):
        return [v[-1]]
    user: UserResponse


class ApplicationResponse(ApplicationMultiResponse):
    pass