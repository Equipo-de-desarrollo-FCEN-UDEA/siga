from app.domain.errors.base import BaseErrors

class ReportFullTimeErrors(BaseErrors):
    pass

report_full_time_from_full_time_404 = ReportFullTimeErrors(404, "La dedicación exclusiva que busca no está asignada al usuario.")
report_full_time_from_full_time_422 = ReportFullTimeErrors(422, "La dedicación exclusiva que busca no existe.")