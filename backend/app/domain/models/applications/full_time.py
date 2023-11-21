from typing import Any
from datetime import datetime

from odmantic import Model

# Model

class FullTime(Model):
    title: str
    work_plan: Any | None
    vice_format: Any | None
    initial_letter: Any | None
    documents: list[Any] | None
    start_date: datetime | None
    end_date: datetime | None
