from sqlalchemy import Column, Integer, DateTime


from .base import Base

# Festivos
class Holiday(Base):
    holiday_date = Column(DateTime(timezone=True), nullable=False, unique=True, primary_key=True)