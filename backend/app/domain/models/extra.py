from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from .base import Base

if TYPE_CHECKING:
    from .user import User

class Extra(Base):
    id = Column(Integer, primary_key=True)
    CCRG_code = Column(String(15), nullable=False)
    name = Column(String(100), nullable=False)
    area = Column(String(50), nullable=False)

    #relations
    coordinador_id = Column(Integer, ForeignKey("user.id"))
    coordinador = relationship("User", back_populates="extra")
    department_id = Column(Integer, ForeignKey("department.id"))
    department = relationship("Department", back_populates="extras")