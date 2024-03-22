from odmantic import Model

from typing import Any
from datetime import datetime

class FullTime(Model):
    title: str
    start_date: datetime
    work_plan: Any | None
    vice_format: Any | None
    initial_letter: Any | None
    documents: list[Any] | None
