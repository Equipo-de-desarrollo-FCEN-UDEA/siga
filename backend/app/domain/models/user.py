from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from .base import Base

if TYPE_CHECKING:
    from .department import Department


# Creamos el modelo usuario
class User(Base):
    id = Column(Integer, primary_key=True)
    lastNames = Column(String(50), nullable=False)
    names = Column(String(50), nullable=False)
    identificationNumber = Column(String(20), nullable=False, unique=True)
    email = Column(String(100), nullable=False)
    active = Column(Boolean, default=True)
    scale = Column(String(50), nullable=False)
    phone = Column(String(50), nullable=True)
    office = Column(String(5), nullable=True)
    vinculationType = Column(String(50), nullable=False)
    hashed_password = Column(String(300), nullable=False)
    rol_id = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    #Relaciones
    department_id = Column(Integer, ForeignKey("department.id"))
    department = relationship("Department", back_populates="users")
