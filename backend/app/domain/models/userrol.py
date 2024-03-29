from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, validates

from .base import Base

if TYPE_CHECKING:
    from .department import Department
    from .rol import Rol
    from .user import User
    from .application import Application


# Middle table
class UserRol(Base):
    #__tablename__='userrol'
    id = Column(Integer, primary_key=True)
    description = Column(String(50), nullable=True)
   
    # relations
    rol_id = Column(Integer, ForeignKey("rol.id"))
    rol = relationship("Rol", back_populates = "userrol")
    user_id = Column(Integer, ForeignKey("user.id"))
    users = relationship("User", back_populates = "userrol")