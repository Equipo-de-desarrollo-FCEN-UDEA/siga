from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .application_status import Application_status
    from .application_subtype import ApplicationSubType


class Application(Base):
    id = Column(Integer, primary_key=True)
    mongo_id = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), default=func.now())
    filed = Column(Boolean, default=False)
    start_date = Column(DateTime(timezone=True), nullable=True)
    end_date = Column(DateTime(timezone=True), nullable=True)

    #Relaciones
    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="applications")
    application_sub_type_id = Column(Integer, ForeignKey("applicationsubtype.id"))
    application_sub_type = relationship("ApplicationSubType", back_populates="applications")

    application_status = relationship("Application_status", back_populates="application")