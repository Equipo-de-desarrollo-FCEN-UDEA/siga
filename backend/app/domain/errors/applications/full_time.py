from app.domain.errors.base import BaseErrors


class FullTimeErrors(BaseErrors):
    pass

full_time_date_403 = FullTimeErrors(403, "La fecha de inicio no puede ser menor a la fecha actual")