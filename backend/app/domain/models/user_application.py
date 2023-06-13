
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from typing import TYPE_CHECKING

from .base import Base

if TYPE_CHECKING:
    from .user import User
    from .application import Application
    from .status import Status

class UserApplication(Base):
    __tablename__ = "user_application"

    id = Column(Integer, primary_key=True)
    amount = Column(Integer, nullable=True)

    #relations
    status_id = Column(Integer, ForeignKey("status.id"))
    status = relationship("Status", back_populates="user_application")

    application_id = Column(Integer, ForeignKey("application.id"))
    application = relationship("Application", back_populates="user_application")

    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="user_application")