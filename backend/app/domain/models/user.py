from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from .base import Base


class User(Base):
    id = Column(Integer, primary_key=True)
    primerApellido = Column(String(20), nullable=False)
    segundoApellido = Column(String(20), nullable=False)
    primerNombre = Column(String(20), nullable=False)
    otrosNombres = Column(String(50), nullable=True)
    pais = Column(String(255), nullable=False)
    numeroIdentificacion = Column(String(20), nullable=False, unique=True)
    # correo = Column(String(300), nullable=False, unique=True)
    fechaIngreso = Column(DateTime, nullable=False)
    hashed_password = Column(String(300), nullable=False)
    activo = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default = func.now())
    updated_at = Column(String(255), onupdate=func.now())
