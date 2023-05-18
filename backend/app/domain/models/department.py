from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .school import School


#Modelo departamento
class Department(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    description = Column(String(100), nullable=False)
    coord_email = Column(String(100), nullable=False)
    cost_center = Column(Integer, nullable=True)
    director = Column(String, nullable=True)

    #Relaciones
    users = relationship("User", back_populates="department")
    school_id = Column(Integer, ForeignKey("school.id"))
    school = relationship("School", back_populates="departments")
    
    extras = relationship("Extra", back_populates="department")