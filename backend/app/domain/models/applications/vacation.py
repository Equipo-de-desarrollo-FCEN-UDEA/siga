from datetime import datetime
from typing import Any

from odmantic import Model

class Vacation(Model):
    total_days: int
    start_date: datetime
    end_date: datetime
    documents: Any
    signature: Any