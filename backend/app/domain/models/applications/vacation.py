from datetime import datetime
from typing import Any

from odmantic import Model

class Vacation(Model):
    total_working_days: int
    total_calendar_days: int
    start_working_date: datetime
    end_working_date: datetime
    start_calendar_date: datetime
    end_calendar_date: datetime
    documents: list[Any]
    signature: str
    resolution: str | None
