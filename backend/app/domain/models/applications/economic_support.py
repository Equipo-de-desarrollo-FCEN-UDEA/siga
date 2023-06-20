from datetime import datetime
from typing import Any

from odmantic import Model

class EconomicSupport(Model):
    dependence: list[Any] | None
    application_data: Any | None
    personal_data: Any | None
    tickets: Any | None
    payment: Any | None
    documents: list[Any] | None
