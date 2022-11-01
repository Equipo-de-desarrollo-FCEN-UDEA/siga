from app.domain.schemas import StateCreate, SchoolUpdate
from app.domain.models import State
from app.domain.policies import StatePolicy
from app.domain.schemas.state import StateUpdate
from .base import CRUDBase


class CRUDState(CRUDBase[State, StateCreate, StateUpdate, StatePolicy]):
    pass

policy = StatePolicy()

state = CRUDState(State, policy=policy)