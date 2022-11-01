from app.domain.models import State
from app.domain.schemas import StateCreate, StateUpdate
from .base import Base

class StatePolicy(Base[State, StateCreate, StateUpdate]):
    pass