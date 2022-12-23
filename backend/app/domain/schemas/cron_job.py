from datetime import datetime

from pydantic import BaseModel


class CronJobBase(BaseModel):
    send_date: datetime
    template: str
    user_email: str
    

class CronJobCreate(CronJobBase):
    pass

class CronJobUpdate(CronJobBase):
    pass