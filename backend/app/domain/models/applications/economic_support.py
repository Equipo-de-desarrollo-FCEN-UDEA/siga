from datetime import datetime
from typing import Any

from odmantic import Model

class EconomicSupport(Model):
    start_date: datetime
    end_date: datetime
    country: str
    justification: str
    support: Any
    budget: list[Any]
    documents: list[Any]

    state: str | None
    city: str | None
    lenguage: str | None


