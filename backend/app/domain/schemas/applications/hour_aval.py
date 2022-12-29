from pydantic import BaseModel, Field

from app.domain.schemas.application import ApplicationResponse

# ---------------
# -Helper Models-
# ---------------


class Applicant(BaseModel):
    identification_number: str
    acepted: bool | None = None
    role: str

# --------------
# ----Model-----
# --------------


class HourAvalBase(BaseModel):
    time: int = Field(gt=1, lt=48)
    hours_week: int
    description: str = Field(min_length=30, max_length=500)
    announcement: str
    entity: str | None = Field(max_length=255)
    role: str = Field(max_length=50)
    another_applicants: list[Applicant]
    objectives: list[str]


class HourAvalCreate(HourAvalBase):
    application_sub_type_id: int = 11


class HourAvalUpdate(HourAvalBase):
    application_sub_type_id: int = 11


class HourAvalInDB(HourAvalBase):
    letter_path: str | None


class HourAvalResponse(ApplicationResponse):
    hour_aval: HourAvalInDB
