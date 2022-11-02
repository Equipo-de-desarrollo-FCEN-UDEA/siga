from typing import TYPE_CHECKING

from sqlalchemy import Integer, String, ForeignKey, Column, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from .base import Base

if TYPE_CHECKING:
    from .application import Application
    from .state import State


class Application_state(Base):
    id = Column(Integer, primary_key=True)
    observation = Column(String(50), nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now())

    # relations
    application_id = Column(Integer, ForeignKey("application.id"))
    application = relationship("Application", back_populates="application_state")
    state_id = Column(Integer, ForeignKey("state.id"))
    state = relationship("State", back_populates="application_state")
