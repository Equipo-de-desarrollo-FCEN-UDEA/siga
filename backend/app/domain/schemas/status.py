from pydantic import BaseModel


class StatusBase(BaseModel):
    name: str
    description: str | None


class StatusCreate(StatusBase):
    pass


class StatusUpdate(StatusBase):
    pass


class StatusInDB(StatusBase):
    id: int

    class Config:
        orm_mode = True