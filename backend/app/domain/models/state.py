from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from .base import Base


class State(Base):
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    description = Column(String(255), nullable=True)

    #relations