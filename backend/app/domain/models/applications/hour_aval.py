from typing import Any

from odmantic import Model, EmbeddedModel

class Applicant(EmbeddedModel):
    email: str
    acepted: bool | None = None
    role: str


class HourAval(Model):
    time: int
    hours_week: int
    description: str
    announcement: str
    entity: str | None
    role: str
    another_applicants: list[Applicant]
    letter_path: str | None
    objectives: list[str]