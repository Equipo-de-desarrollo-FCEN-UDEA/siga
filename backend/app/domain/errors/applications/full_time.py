from app.domain.errors.base import BaseErrors

class FullTimeErrors(BaseErrors):
    pass

full_time_403 = FullTimeErrors(403, detail="La fecha de inicio es requerida")