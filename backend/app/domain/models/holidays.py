from sqlalchemy import Column, Integer, DateTime


from .base import Base

# Festivos
class Holidays(Base):
    id = Column(Integer, primary_key=True)
    holiday_date = Column(DateTime(timezone=True), nullable=False, unique=True)