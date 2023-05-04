from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from .users_rol import UserRol

from .base import Base

if TYPE_CHECKING:
    from .user import User


class Rol(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    description = Column(String(50), nullable=False)
    scope = Column(Integer)

    # relations
    rol_users = relationship("UserRol",back_populates="rol")
    #users = relationship("User", back_populates="rol")
