from typing import Any
from json import loads

from odmantic import ObjectId
from odmantic.session import AIOSession

from app.domain.models import ReportFullTime, FullTime
from app.domain.schemas import ReportFullTimeUpdate, ReportFullTimeCreate
from app.domain.policies.applications.report_full_time import ReportFullTimePolicy
from .base import CRUDBase

class CRUDReportFullTime(CRUDBase[ReportFullTime, ReportFullTimeCreate, ReportFullTimeUpdate, ReportFullTimePolicy]):
    pass

policy = ReportFullTimePolicy()

report_full_time = CRUDReportFullTime(ReportFullTime, policy=policy)