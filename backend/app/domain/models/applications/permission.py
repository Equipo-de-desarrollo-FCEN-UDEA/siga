from datetime import datetime

from odmantic import Model


class Permission(Model):
    start_date: datetime
    end_date: datetime
    justification: str