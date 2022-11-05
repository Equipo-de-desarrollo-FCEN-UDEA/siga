from email.policy import default
from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .application_state import Application_state
    from .application_subtype import ApplicationSubType


class Application(Base):
    id = Column(Integer, primary_key=True)
    mongo_id = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    filed = Column(Boolean, default=False)
    
    #Relaciones
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="applications")
    applicationSubType_id = Column(Integer, ForeignKey("applicationsubtype.id"))
    applicationSubType = relationship("ApplicationSubType", back_populates="applications")

    application_state = relationship("Application_state", back_populates="application")