from datetime import datetime
from typing import Any

from odmantic import Model

class Vacation(Model):
    start_date: datetime | None
    end_date: datetime | None
    total_working_days: int | None
    total_calendar_days: int | None
    start_working_date: datetime | None
    end_working_date: datetime | None
    start_calendar_date: datetime | None
    end_calendar_date: datetime | None
    documents: list[Any]
    signature: str
    resolution: str | None
