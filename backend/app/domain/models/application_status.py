from typing import TYPE_CHECKING

from sqlalchemy import Integer, String, ForeignKey, Column, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .application import Application
    from .status import Status


class Application_status(Base):
    id = Column(Integer, primary_key=True)
    observation = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now())

    # relations
    application_id = Column(Integer, ForeignKey("application.id"))
    application = relationship("Application", back_populates="application_status")
    status_id = Column(Integer, ForeignKey("status.id"))
    status = relationship("Status", back_populates="application_status")
