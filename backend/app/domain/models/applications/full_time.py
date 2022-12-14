from typing import Any

from odmantic import Model

# Model

class FullTime(Model):
    title: str
    work_plan: Any | None
    vice_format: Any | None
    initial_letter: Any | None
