from typing import Any
from datetime import datetime

from pydantic import BaseModel, Field

from app.domain.schemas.application import ApplicationResponse

# ---------------
# -Helper Models-
# ---------------


class Applicant(BaseModel):
    email: str
    acepted: bool | None = None
    time: int | None
    role: str
    backrest: str | None


class Product(BaseModel):
    name: str = Field(min_length=10, max_length=50)
    description: str = Field(min_length=10, max_length=300)


class Act(BaseModel):
    act: str
    date: datetime

# --------------
# ----Model-----
# --------------


class HourAvalBase(BaseModel):
    time: int = Field(gt=1, lt=48)
    hours_week: int
    title: str = Field(min_length=10, max_length=255)
    description: str = Field(min_length=30, max_length=500)
    announcement: str
    entity: str | None = Field(max_length=255)
    role: str = Field(max_length=50)
    another_applicants: list[Applicant] = Field(default_factory=list)
    products: list[Product]
    backrest: str | None


class HourAvalCreate(HourAvalBase):
    application_sub_type_id: int = 11


class HourAvalUpdate(HourAvalBase):
    application_sub_type_id: int = 11


class HourAvalInDB(HourAvalBase):
    documents: list[Any] | None = Field(default_factory=list)


class HourAvalResponse(ApplicationResponse):
    hour_aval: HourAvalInDB
