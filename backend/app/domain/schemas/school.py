from pydantic import BaseModel


class SchoolBase(BaseModel):
    name: str
    description: str
    costCenter: int
    emailDean: str


class SchoolCreate(SchoolBase):
    pass


class SchoolUpdate(SchoolBase):
    pass


class SchoolInDB(SchoolBase):
    id: int

    class Config:
        orm_mode = True