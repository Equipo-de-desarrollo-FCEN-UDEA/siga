from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from odmantic.session import AIOSession

from typing import Any

from dateutil.relativedelta import relativedelta

from bson.objectid import ObjectId

from app.api.middlewares import db, jwt_bearer, mongo_db
from app.services import crud, documents, emails
from app.domain.schemas import Application_statusCreate, Application_statusInDB, CronJobCreate
from app.domain.models import User
from app.domain.errors import BaseErrors
from app.domain.errors.applications.full_time import *
from app.services.crud.cron_job import cron_job

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
):
    """
        Endpoint to create an application status.

        Args:
            application_status (Application_statusCreate): Data model for creating application status.
            db (Session, optional): Database session dependency. Defaults to Depends(db.get_db).
            engine (AIOSession, optional): MongoDB session dependency. Defaults to Depends(mongo_db.get_mongo_db).
            current_user (User, optional): Current authenticated user dependency. Defaults to Depends(jwt_bearer.get_current_active_user).

        Raises:
            HTTPException: If there's an error during the process.

        Returns:
            Application_statusInDB: Created application status.
    """
    try:
        # Add user's role description to the observation
        application_status.observation += f' por {current_user.userrol[current_user.active_rol].rol.description}'
        # Get application from database
        application = crud.application.get(
            db, current_user, id=application_status.application_id)

        # Get application name
        app_type_name = application.application_sub_type.application_type.name
        actual_status = application.application_status[-1].status.name

        if actual_status == 'EN VICERRECTORÍA' and app_type_name == 'DEDICACIÓN EXCLUSIVA':
            if application.start_date is None:
                raise full_time_403

        # Create application status
        response = crud.application_status.create(
            db, current_user, obj_in=application_status, to=application)

        # Get status name
        status_name = response.status.name
        
        # List of application types
        APPLICATIONS_NAMES = ["COMISIÓN", "PERMISO", "VACACIONES", "APOYO ECONÓMICO", "DEDICACIÓN EXCLUSIVA"]
        
        # Process based on status and application type
        if status_name == 'APROBADA':
            # Send email for approved status
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                    application_status.observation, response.status.name, application.id, application.user.email))
            if app_type_name == "COMISIÓN":
                # generate commission resolution document
                await documents.commission_resolution_generation(user=application.user, application=application, mong_db=engine)

            elif app_type_name == "PERMISO":
                # generate permission resolution document
                await documents.permission_resolution_generation(user=application.user, application=application, mong_db=engine)
                
            elif app_type_name == "DEDICACIÓN EXCLUSIVA":
                full_time = await crud.full_time.get(db=engine, id=ObjectId(application.mongo_id))
                # Set cron job for full time
                await cron_job.create_cron_jobs(application, full_time, db, current_user)

        elif status_name == 'SOLICITADA' and app_type_name in APPLICATIONS_NAMES:
            # Send email for requested status
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                    application_status.observation, response.status.name, application.id, application.user.email))

        elif status_name == 'EN VICERRECTORIA' and app_type_name == "DEDICACIÓN EXCLUSIVA":
            # Send additional email for dedication exclusive
            additional_observation = 'SE HA SOLICITADO UNA FECHA DE INICIO DE LA DEDICACIÓN EXCLUSIVA'
            application_status.observation += ' ' + additional_observation
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                    application_status.observation, response.status.name, application.id, application.user.email))

        elif status_name == 'VISTO BUENO':
            # Send email for dean approval
            emails.update_status_email.apply_async(args=(application.application_sub_type.application_type.description,
                                                    application_status.observation, response.status.name, application.id, application.user.email))
            
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
    """
        Endpoint to get an application status.
        
        Args:
            db (Session, optional): Database session dependency. Defaults to Depends(db.get_db).
            engine (AIOSession, optional): MongoDB session dependency. Defaults to Depends(mongo_db.get_mongo_db).
            current_user (User, optional): Current authenticated user dependency. Defaults to Depends(jwt_bearer.get_current_active_user).
            id (int): Application status id.
            
        Raises:
            HTTPException: If there's an error during the process.
        
        Returns:
            list[Application_statusInDB]: Application status.
    """
    try:
        response = crud.application_status.get_application_status(
            db, id=id)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return response
