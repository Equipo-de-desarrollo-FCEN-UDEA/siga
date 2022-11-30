from typing import TYPE_CHECKING

from sqlalchemy import Column, String, Integer
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from .base import Base

if TYPE_CHECKING:
    from .department import Department


class School(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(100), nullable=True)
    cost_center = Column(Integer, nullable=False)
    email_dean = Column(String(200), nullable=False)
    direction = Column(String(255), nullable=False)
    contact = Column(String(255), nullable=False)
    dean = Column(String(255), nullable=False)

    #Relations
    departments = relationship("Department", back_populates="school")

