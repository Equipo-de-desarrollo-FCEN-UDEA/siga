from datetime import datetime

from pydantic import BaseModel


class CronJobBase(BaseModel):
    send_date: datetime
    template: str
    user_email: str


class CronJobBaseInDB(CronJobBase):    
    id: int

    class Config:
        orm_mode = True


class CronJobCreate(CronJobBase):
    pass

class CronJobUpdate(CronJobBase):
    pass