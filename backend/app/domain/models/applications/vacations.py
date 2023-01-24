from datetime import datetime
from typing import Any

from odmantic import Model

class Vacations(Model):
    vinculation_type: str
    service_type: str
    vacations_type: bool
    start_date: datetime
    end_date: datetime
    justification: str
    resolution: str | None
    documents: list[Any] | None