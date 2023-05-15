from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, validates

from .base import Base

if TYPE_CHECKING:
    from .department import Department
    from .rol import Rol
    from .application import Application


# Creamos el modelo usuario
class User(Base):
    #__tablename__='users'
    id = Column(Integer, primary_key=True)
    last_names = Column(String(50), nullable=False)
    names = Column(String(50), nullable=False)
    identification_number = Column(String(20), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    active = Column(Boolean, default=False)
    scale = Column(String(50), nullable=False)
    phone = Column(String(50), nullable=True)
    office = Column(String(5), nullable=True)
    identification_type = Column(String(100), nullable=False)
    vinculation_type = Column(String(50), nullable=False)
    hashed_password = Column(String(300), nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # relations
    department_id = Column(Integer, ForeignKey("department.id"))
    department = relationship("Department", back_populates="users")
    rol_id = Column(Integer, ForeignKey("rol.id"))
    rol = relationship("Rol", back_populates="users")
    applications = relationship("Application", back_populates="user")

    extra = relationship("Extra", back_populates="coordinador")