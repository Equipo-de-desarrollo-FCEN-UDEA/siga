from typing import TYPE_CHECKING

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from .base import Base

if TYPE_CHECKING:
    from .application_subtype import ApplicationSubType


class ApplicationType(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    description = Column(String(50), nullable=False)

    # relations
    applicationSubTypes = relationship(
        "ApplicationSubType", back_populates="applicationtype")
