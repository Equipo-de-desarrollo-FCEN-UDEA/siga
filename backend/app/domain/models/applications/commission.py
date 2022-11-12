from datetime import datetime

from odmantic import Model

class Commission(Model):
    country: str
    state: str
    city: str
    start_date: datetime
    end_date: datetime
    lenguage: str
    justification: str
