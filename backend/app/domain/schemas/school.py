from pydantic import BaseModel


class SchoolBase(BaseModel):
    name: str
    description: str
    cost_center: int
    email_dean: str
    direction: str
    contact: str
    dean: str


class SchoolCreate(SchoolBase):
    pass


class SchoolUpdate(SchoolBase):
    pass


class SchoolInDB(SchoolBase):
    id: int

    class Config:
        orm_mode = True


class SchoolResponse(SchoolInDB):
    pass