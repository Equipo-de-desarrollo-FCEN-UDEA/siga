from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship

from .base import Base

if TYPE_CHECKING:
    from .application_type import ApplicationType
    from .application import Application


class ApplicationSubType(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    extra = Column(JSON, nullable=True)

    # Relations
    application_type_id = Column(Integer, ForeignKey("applicationtype.id"))
    application_type = relationship(
        "ApplicationType", back_populates="application_sub_type")
    applications = relationship("Application", back_populates="application_sub_type")
