from datetime import datetime
from typing import List

from app.domain.models import ReportFullTime, FullTime
from app.domain.schemas import ReportFullTimeCreate, ReportFullTimeUpdate
from app.domain.policies.base import Base
from app.domain.errors.applications.report_full_time import *


class ReportFullTimePolicy(Base[ReportFullTime, ReportFullTimeCreate, ReportFullTimeUpdate]):
    def check_from_full_time(self, report: ReportFullTime, fulltime: FullTime) -> None:
        if (report.from_full_time):
            if not (fulltime):
                raise report_full_time_from_full_time_422
        return None
    
    def check_full_time_id(self, report: ReportFullTime, list_full_time: List[FullTime]):
        full_time_ids = [full_time['id'] for full_time in list_full_time]
        if (report.full_time_id not in full_time_ids):
            raise report_full_time_from_full_time_404
        return None