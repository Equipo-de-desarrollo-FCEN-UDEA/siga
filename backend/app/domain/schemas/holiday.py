from datetime import datetime

from pydantic import BaseModel


class HolidayBase(BaseModel):
    holiday_date: datetime


class HolidayInDB(HolidayBase):    
    
    class Config:
        orm_mode = True

class HolidayCreate(HolidayBase):
    pass

class HolidayUpdate(HolidayBase):
    pass

class HolidayResponse(HolidayBase):
    pass
