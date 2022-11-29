from datetime import datetime
from typing import Any

from odmantic import Model


class Permission(Model):
    start_date: datetime
    end_date: datetime
    justification: str
    resolution: str | None
    documents: list[Any] | None