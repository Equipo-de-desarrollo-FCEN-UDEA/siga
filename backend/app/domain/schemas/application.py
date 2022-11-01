from datetime import datetime

from pydantic import BaseModel


class ApplicationBase(BaseModel):
    mongo_id: int
    application_subtype_id: int
    user_id: int


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(ApplicationBase):
    pass


class ApplicationInDB(ApplicationBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True