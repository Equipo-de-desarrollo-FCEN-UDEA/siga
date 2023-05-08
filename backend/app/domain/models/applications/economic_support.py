from datetime import datetime
from typing import Any

from odmantic import Model

class EconomicSupport(Model):
    economic_support: Any
    document: list[Any] | None
    



