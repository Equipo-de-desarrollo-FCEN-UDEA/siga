from datetime import datetime

from pydantic import BaseModel


class HolidaysBase(BaseModel):
    holiday_date: datetime


class HolidaysInDB(HolidaysBase):
    id: int
    
    class Config:
        orm_mode = True

class HolidaysCreate(HolidaysBase):
    pass
