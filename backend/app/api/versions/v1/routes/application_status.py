from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from odmantic.session import AIOSession

from dateutil.relativedelta import relativedelta

from bson.objectid import ObjectId

from app.api.middlewares import db, jwt_bearer, mongo_db
from app.services import crud, documents, emails
from app.domain.schemas import Application_statusCreate, Application_statusInDB, CronJobCreate
from app.domain.models import User
from app.domain.errors import BaseErrors

from app.core.logging import get_logging

log = get_logging(__name__)

router = APIRouter()


@router.post('/', response_model=Application_statusInDB)
async def create_application_status(
    application_status: Application_statusCreate,
    *,
    db: Session = Depends(db.get_db),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    # ) -> Application_statusInDB:
):
    application_status.observation += f' por {current_user.rol.description}'
    try:
        application = crud.application.get(
            db, current_user, id=application_status.application_id)
        response = crud.application_status.create(
            db, current_user, obj_in=application_status, to=application)

        # Cases of document generations
        # Commision
        if (response.status.name == 'APROBADA' and
                application.application_sub_type.application_type.name == "COMISIÓN"):
            await documents.commission_resolution_generation(user=application.user, application=application, mong_db=engine)
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                     application_status.observation, response.status.name, application.id, [application.user.email]))

        # Permission
        if (response.status.name == 'APROBADA' and
                application.application_sub_type.application_type.name == "PERMISO"):
            await documents.permission_resolution_generation(user=application.user, application=application, mong_db=engine)
            log.debug('GENERADA RESOLUCION')
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                     application_status.observation, response.status.name, application.id, application.user.email))
            log.debug('CORREO...')
        
        # Vacations
        #TODO: AL MOMENTO QUE SE APRUEBA LA SOLICITUD SE TIEsNE QUE GENERAR EL FORMATO
        if (response.status.name == 'APROBADA' and
                application.application_sub_type.application_type.name == "VACACIONES"):
            log.debug('VACATION APRROVED!!!!')
            #await documents.fill_vacations_format(user=application.user, application=vacation)
        # emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                    # application_status.observation, response.status.name, application.id, application.user.email))

        # Full time
        if (response.status.name == 'APROBADA' and
                application.application_sub_type.application_type.name == "DEDICACIÓN EXCLUSIVA"):

            full_time = await crud.full_time.get(db=engine, id=ObjectId(application.mongo_id))

            dates_to_save = []

            # Tomar solo las fechas del plan de trabajo
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

            log.debug('dates_to_save', dates_to_save)
            for date in dates_to_save:
                # se crea una tarea a ejecutar con un CRON con las fechas del work_plan
                cron_obj = CronJobCreate(
                    send_date=date - relativedelta(months=1),
                    template="email.report.full.time.html.j2",
                    user_email=application.user.email,
                    id_application=application.id
                )
                crud.cron_job.create(db=db, who=current_user, obj_in=cron_obj)

        # status Visto bueno:
        if response.status == 'VISTO BUENO':
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                        application_status.observation, response.status.name, application.id, application.user.department.school.email_dean))
            
    
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return response
