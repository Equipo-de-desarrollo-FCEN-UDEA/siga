from datetime import datetime

from odmantic import Model

class Commission(Model):
    country: str
    state: str | None
    city: str | None
    start_date: datetime
    end_date: datetime
    lenguage: str | None
    justification: str
    documents: list[str] | None
    resolution: str | None
    cumplido: str | None
