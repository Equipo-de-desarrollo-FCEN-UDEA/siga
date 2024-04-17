from typing import Any, List
from datetime import datetime
from sqlalchemy import exc, extract
from dateutil.relativedelta import relativedelta

# from odmantic import ObjectId
# from odmantic.session import AIOSession

from sqlalchemy.orm import Session

from app.services.crud import base

from app.domain.models import CronJob, User
from app.domain.schemas import CronJobCreate, CronJobUpdate
from app.domain.policies import CronJobPolicy
from .base import CRUDBase

from app.core.logging import get_logging

log = get_logging(__name__)


class CRUDCronJob(CRUDBase[CronJob, CronJobCreate, CronJobUpdate, CronJobPolicy]):

    def get_multi(self, db: Session, today: datetime) -> List[CronJob]:
        #Busca en cron_job todos mensajes que se deben enviar hoy
        db_objs = db.\
            query(CronJob).\
            filter(extract('month', CronJob.send_date) == today.month,
            extract('year', CronJob.send_date) == today.year,
            extract('day', CronJob.send_date) == today.day).\
            all()
        return db_objs
    
    async def create_cron_jobs(self, application, full_time, db, current_user):
        """
        Create cron jobs for each activity in the full time application

        Args:
            application (Application): Application object
            full_time (FullTime): FullTime object
            db (Session): Database session
            current_user (User): Current user
        """
        dates_to_save = []
        if full_time.work_plan['teaching_activities']:
            for activity in full_time.work_plan['teaching_activities']:
                dates_to_save.append(
                    activity['activity_tracking']['date_1'])
                dates_to_save.append(
                    activity['activity_tracking']['date_2'])

        if full_time.work_plan['investigation_activities']:
            for activity in full_time.work_plan['investigation_activities']:
                dates_to_save.append(
                    activity['activity_tracking']['date_1'])
                dates_to_save.append(
                    activity['activity_tracking']['date_2'])

        if full_time.work_plan['extension_activities']:
            for activity in full_time.work_plan['extension_activities']:
                dates_to_save.append(
                    activity['activity_tracking']['date_1'])
                dates_to_save.append(
                    activity['activity_tracking']['date_2'])

        if full_time.work_plan['academic_admin_activities']:
            for activity in full_time.work_plan['academic_admin_activities']:
                dates_to_save.append(
                    activity['activity_tracking']['date_1'])
                dates_to_save.append(
                    activity['activity_tracking']['date_2'])

        if full_time.work_plan['other_activities']:
            for activity in full_time.work_plan['other_activities']:
                dates_to_save.append(
                    activity['activity_tracking']['date_1'])
                dates_to_save.append(
                    activity['activity_tracking']['date_2'])

        for date in dates_to_save:
            cron_obj = CronJobCreate(
                send_date=date - relativedelta(months=1),
                template="email.report.full.time.html.j2",
                user_email=application.user.email,
                id_application=application.id
            )
            await CRUDBase.create(db=db, who=current_user, obj_in=cron_obj)


policy = CronJobPolicy()

cron_job = CRUDCronJob(CronJob, policy=policy)
