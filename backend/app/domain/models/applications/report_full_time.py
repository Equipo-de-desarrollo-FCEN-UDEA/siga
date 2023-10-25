from typing import Any

from odmantic import Model

# Model

class ReportFullTime(Model):
    from_full_time: bool
    full_time_id: int | None
    documents: list[Any] | None