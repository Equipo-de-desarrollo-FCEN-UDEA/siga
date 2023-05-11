from datetime import datetime
from typing import Optional, List, Any

from pydantic import BaseModel, validator

from .application_subtype import ApplicationSubTypeInside
from .application_status import Application_statusResponse
from .user import UserResponse


class ApplicationBase(BaseModel):
    mongo_id: Any
    application_sub_type_id: int
    start_date: datetime | None
    end_date: datetime | None
    user_id: int


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(ApplicationBase):
    filed: bool | None


class ApplicationInDB(ApplicationUpdate):
    id: int
    created_at: datetime
    

    # Pydantic models can be created from arbitrary class instances to 
    # support models that map to ORM objects. 
    class Config:
        orm_mode = True


class ApplicationResponse(ApplicationInDB):
    application_sub_type: Optional[ApplicationSubTypeInside]
    application_status: Optional[List[Application_statusResponse]]
    user: UserResponse


class ApplicationMultiResponse(ApplicationResponse):
    @validator('application_status')
    def last_status(cls, v, values, **kwargs):
        return [v[-1]]