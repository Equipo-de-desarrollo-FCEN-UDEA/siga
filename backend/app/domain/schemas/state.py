from pydantic import BaseModel


class StateBase(BaseModel):
    name: str
    description: str | None


class StateCreate(StateBase):
    pass


class StateUpdate(StateBase):
    pass


class StateInDB(StateBase):
    id: int

    class Config:
        orm_mode = True