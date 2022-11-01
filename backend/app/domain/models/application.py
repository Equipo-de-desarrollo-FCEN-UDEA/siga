from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .application_state import Application_state


class Application(Base):
    id = Column(Integer, primary_key=True)
    mongo_id = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    
    #Relaciones
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="applications")
    applicationSubType_id = Column(Integer, ForeignKey("applicationsubtype.id"))
    applicationSubType = relationship("ApplicationSubType", back_populates="application")

    application_states = relationship("Application_state", back_populates="application")