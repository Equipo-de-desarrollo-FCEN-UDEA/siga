from sqlalchemy import Column, DateTime, Integer, String

from .base import Base

class CronJob(Base):
    id = Column(Integer, primary_key=True)
    send_date = Column(DateTime(timezone=True), nullable=False)
    template = Column(String(50), nullable=False)
    user_email = Column(String(50), nullable=False)
    id_application = Column(Integer)