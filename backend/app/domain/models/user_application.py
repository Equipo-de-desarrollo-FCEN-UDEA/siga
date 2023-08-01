
from sqlalchemy import Column, Integer, ForeignKey, JSON
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
    response = Column(Integer, nullable=True)
    document = Column(JSON, nullable=True)

    application_id = Column(Integer, ForeignKey("application.id"))
    application = relationship("Application", back_populates="user_application")

    user_id = Column(Integer, ForeignKey("user.id"))
    user = relationship("User", back_populates="user_application")