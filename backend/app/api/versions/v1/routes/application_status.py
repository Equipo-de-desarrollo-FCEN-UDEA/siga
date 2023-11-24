from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from odmantic.session import AIOSession
from datetime import datetime

from typing import Any

from dateutil.relativedelta import relativedelta

from bson.objectid import ObjectId

from app.api.middlewares import db, jwt_bearer, mongo_db
from app.services import crud, documents, emails
from app.domain.schemas import Application_statusCreate, Application_statusInDB, CronJobCreate, FullTimeUpdate
from app.domain.models import User, FullTime
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
    application_status.observation += f' por {current_user.userrol[current_user.active_rol].rol.description}'
    try:
        application = crud.application.get(
            db, current_user, id=application_status.application_id)

        response = crud.application_status.create(
            db, current_user, obj_in=application_status, to=application)
        
      
        
        
        # Cases of document generations
        #  Commision
        if (response.status.name == 'APROBADA' and
                application.application_sub_type.application_type.name == "COMISIÓN"):
            await documents.commission_resolution_generation(user=application.user,
                                                              application=application, mong_db=engine)
            
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                         application_status.observation, response.status.name, application.id, [application.user.email]))


        # Permission
        if (response.status.name == 'APROBADA' and
                application.application_sub_type.application_type.name == "PERMISO"):
            await documents.permission_resolution_generation(user=application.user,
                                                              application=application, mong_db=engine)
            
            log.debug('GENERADA RESOLUCION')
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                         application_status.observation, response.status.name, application.id, application.user.email))
            log.debug('CORREO...')


        #  Vacations
        if (response.status.name == 'APROBADA' and
                application.application_sub_type.application_type.name == "VACACIONES"):
            
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                         application_status.observation, response.status.name, application.id, application.user.email))
            

        #APOYO ECONOMICO
        if (response.status.name == 'SOLICITADA' and
             application.application_sub_type.application_type.name == "APOYO ECONÓMICO"):
            
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                         application_status.observation, response.status.name, application.id, application.user.email))

        if (response.status.name == 'APROBADA'
                and application.application_sub_type.application_type.name == "APOYO ECONÓMICO"):
            
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                         application_status.observation, response.status.name, application.id, application.user.email))
        
        #DEDICACIÓN EXCLUSIVA
        if (response.status.name == 'SOLICITADA' and application.application_sub_type.application_type.name == "DEDICACIÓN EXCLUSIVA"):
            log.debug(application.user.email)
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                         application_status.observation, response.status.name, application.id, []))
            
        if (response.status.name == 'EN CONSEJO' and application.application_sub_type.application_type.name == "DEDICACIÓN EXCLUSIVA"):
            log.debug(application.user.email)
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                         application_status.observation, response.status.name, application.id, [application.user.email, application.user.department.secre_email]))
                
           
        if (response.status.name == 'APROBADA' and application.application_sub_type.application_type.name == "DEDICACIÓN EXCLUSIVA"):
            log.debug(application.user.email)
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                         application_status.observation, response.status.name, application.id, [application.user.email]))
        # Full time
        
        # if (response.status.name == 'APROBADA' and
        #         application.application_sub_type.application_type.name == "DEDICACIÓN EXCLUSIVA"):
        #     full_time = await crud.full_time.get(db=engine, id=ObjectId(application.mongo_id))
        #     dates_to_save = []
        
        

            full_time = await crud.full_time.get(db=engine, id=ObjectId(application.mongo_id))
                     
            
            # Subiendo las fechas a la base de datos
            duration = full_time.vice_format['time']
            aprobation_date = datetime.today()
            

            log.debug(type(duration), type(aprobation_date))
            application.start_date = aprobation_date
            application.end_date = aprobation_date + relativedelta(months=+duration)
            

# Crea un objeto FullTimeUpdate con las nuevas fechas
            full_time_update = FullTimeUpdate( title=full_time.title,
                                              start_date=aprobation_date, 
                                              end_date=aprobation_date + relativedelta(months=+duration))

# Actualiza el objeto FullTime en la base de datos
            updated_full_time = await crud.full_time.update(engine, db_obj=full_time, obj_in=full_time_update)
           
            
                                        
            
           
            
            
            #Creando el cronjob para la fecha de finalización
            cron_obj_fin = CronJobCreate(
                    send_date=application.end_date - relativedelta(months=1),
                    template="email.report.full.time.fin.html.j2",
                    user_email=application.user.email,
                    id_application=application.id
                )
            
            crud.cron_job.create(db=db, who=current_user, obj_in=cron_obj_fin)

            # Creando los cronjob para cada una de las actividades

            dates_to_save = []
 
            # Tomar solo las fechas del plan de trabajo
            # if full_time.work_plan['teaching_activities']:
            #     for activity in full_time.work_plan['teaching_activities']:
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_1'])
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_2'])

            # if full_time.work_plan['investigation_activities']:
            #     for activity in full_time.work_plan['investigation_activities']:
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_1'])
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_2'])

            # if full_time.work_plan['extension_activities']:
            #     for activity in full_time.work_plan['extension_activities']:
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_1'])
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_2'])

            # if full_time.work_plan['academic_admin_activities']:
            #     for activity in full_time.work_plan['academic_admin_activities']:
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_1'])
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_2'])

            # if full_time.work_plan['other_activities']:
            #     for activity in full_time.work_plan['other_activities']:
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_1'])
            #         dates_to_save.append(
            #             activity['activity_tracking']['date_2'])

            # log.debug('dates_to_save', dates_to_save)
            # for date in dates_to_save:
            #     # se crea una tarea a ejecutar con un CRON con las fechas del work_plan
            #     cron_obj = CronJobCreate(
            #         send_date=date - relativedelta(months=1),
            #         template="email.report.full.time.html.j2",
            #         user_email=application.user.email,
            #         id_application=application.id
            #     )
            #     crud.cron_job.create(db=db, who=current_user, obj_in=cron_obj)

        # status Visto bueno:
        if response.status.name == 'VISTO BUENO':
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                         application_status.observation, response.status.name, application.id, application.user.department.school.email_dean))
        
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return response

@router.get('/{id}', response_model=list[Application_statusInDB])
def get_application_status(
    *,
    db: Session = Depends(db.get_db),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    id: int,
) -> list[Application_statusInDB]:
    try:
        response = crud.application_status.get_application_status(
            db, id=id)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return response