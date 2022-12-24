# from datetime import datetime
# from odmantic import Model

# class CronJob(Model):
#     send_date: datetime
#     template: str
#     user_email: str
    

from sqlalchemy import Column, DateTime, Integer, String

from .base import Base

class CronJob(Base):
    id = Column(Integer, primary_key=True)
    send_date = Column(DateTime(timezone=True), nullable=False)
    template = Column(String(50), nullable=False)
    user_email = Column(String(50), nullable=False)