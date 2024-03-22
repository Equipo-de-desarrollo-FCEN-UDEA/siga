from datetime import datetime
from typing import Any

from odmantic import Model

class Vacation(Model):
    total_working_days: int
    total_calendar_days: int
    start_date_working: datetime
    end_date_working: datetime
    start_date_calendar: datetime
    end_date_calendar: datetime
    documents: list[Any]
    signature: str
    resolution: str | None
