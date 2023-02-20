from datetime import datetime
from typing import Any

from odmantic import Model

class Vacation(Model):
    type_date_application: int
    total_days: int
    start_date: datetime
    end_date: datetime
    documents: list[Any] | None
    signature: Any