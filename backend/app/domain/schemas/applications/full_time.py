from datetime import datetime, time

from pydantic import BaseModel

from app.domain.schemas.application import ApplicationResponse

# ---------------
# -Helper Models-
# ---------------


class Objectives(BaseModel):
    description: str
    actions: list[str]
    indicators: list[str]


class Topics(BaseModel):
    title: str
    subtitle: str
    objectives: Objectives


class ActivityIdentification(BaseModel):
    code: str
    group: int | str
    name: str


class ActivityTracking(BaseModel):
    date_1: datetime
    date_2: datetime
    other: str


class WeekHour(BaseModel):
    t: int
    tp: int
    p: int


class TeachingActivities(BaseModel):
    activity_identification: ActivityIdentification
    student_quantity: int
    level: str
    week_hours: WeekHour
    total_hours: int
    activity_tracking: ActivityTracking | None


class InvestigationActivities(BaseModel):
    code: str
    project_identification: str
    responsibilities: str
    cost: str
    supporting_document: str
    period_hours: int
    activity_tracking: ActivityTracking | None


class ExtensionActivities(BaseModel):
    code: str
    activity_identification: str
    responsibility: str
    cost: str
    week_hours: int
    period_hours: int
    activity_tracking: ActivityTracking | None


class AcademicAdminActivities(BaseModel):
    position: str
    week_hours: int
    period_hours: int
    activities: str
    activity_tracking: ActivityTracking | None


class OtherActivities(BaseModel):
    activity: str
    period_hours: str
    activity_tracking: ActivityTracking | None


class WorkingDay(BaseModel):
    morning_start: time
    morning_end: time
    afternoon_start: time
    afternoon_end: time


class WorkingWeek(BaseModel):
    monday: WorkingDay | None
    tuesday: WorkingDay | None
    wednesday: WorkingDay | None
    thursday: WorkingDay | None
    friday: WorkingDay | None
    saturday: WorkingDay | None

# ------------------
# -Secondary Models-
# ------------------


class WorkPlan(BaseModel):
    period: str
    registro: str
    partial_time: int
    teaching_activities: list[TeachingActivities] | None
    investigation_activities: list[InvestigationActivities] | None
    extension_activities: list[ExtensionActivities] | None
    academic_admin_activities: list[AcademicAdminActivities] | None
    other_activities: list[OtherActivities] | None
    working_week: WorkingWeek


class ViceFormat(BaseModel):
    time: int
    field: str
    description: str
    goals: list[str]
    products: list[str]
    dev_action_plan: list[Topics]


class InitialLetter(BaseModel):
    body: str


# Model

class FullTimeBase(BaseModel):
    title: str


class FullTimeCreate(FullTimeBase):
    application_sub_type_id: int = 10


class FullTimeUpdate(FullTimeBase):
    application_sub_type_id: int = 10


class FullTimeInDB(FullTimeBase):
    work_plan: WorkPlan | None
    vice_format: ViceFormat | None
    initial_letter: InitialLetter | None


class FullTimeResponse(ApplicationResponse):
    full_time: FullTimeInDB