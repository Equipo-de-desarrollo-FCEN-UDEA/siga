from datetime import datetime

from app.domain.models import ReportFullTime, FullTime
from app.domain.schemas import ReportFullTimeCreate, ReportFullTimeUpdate
from app.domain.policies.base import Base
from app.domain.errors.applications.report_full_time import *


class ReportFullTimePolicy(Base[ReportFullTime, ReportFullTimeCreate, ReportFullTimeUpdate]):
    def check_from_full_time(self, report: ReportFullTime, fulltime: FullTime) -> None:
        if (report.from_full_time):
            if not (fulltime):
                raise report_full_time_from_full_time_403
        return None