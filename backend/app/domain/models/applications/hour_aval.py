from typing import Any

from odmantic import Model


class HourAval(Model):
    time: int
    hours_week: int
    description: str
    announcement: str
    entity: str | None
    role: str
    another_applicants: list[Any]
    letter_path: str | None
    objectives: list[str]