
from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.services import crud, documents
from app.domain.models import ReportFullTime, FullTime, User, Application
from app.domain.schemas import (ApplicationCreate,
                                ReportFullTimeCreate,
                                ReportFullTimeUpdate,
                                Msg,
                                ReportFullTimeResponse,
                                FullTimeResponse,
                                ApplicationResponse,
                                Application_statusCreate
                                )
from app.domain.errors.applications.report_full_time import ReportFullTimeErrors
from app.domain.errors.base import BaseErrors

router = APIRouter()

log = get_logging(__name__)
settings = get_app_settings()


@router.post("/", response_model=ReportFullTimeResponse)
async def create_report_full_time(
    report_full_time: ReportFullTimeCreate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> ReportFullTimeResponse:
    """
    Endpoint to create a application type report_full_time

        params:
            - body: report_full_timeCreate

        response:
            - report_full_time
    """
    try:
        report_full_time_created = await crud.report_full_time.create(db=engine,
                                                                      obj_in=ReportFullTime(**dict(report_full_time)))
        if report_full_time_created.from_full_time:
            crud.application.get(
                db, current_user, id=report_full_time_created.full_time_id)
        application = ApplicationCreate(
            mongo_id=str(report_full_time_created.id),
            application_sub_type_id=report_full_time.application_sub_type_id,
            user_id=current_user.id
        )
        application = crud.application.create(
            db=db, who=current_user, obj_in=application
        )
    except BaseErrors as e:
        await engine.remove(ReportFullTime, ReportFullTime.id == report_full_time_created.id)
        log.error('BaseErrors')
        raise HTTPException(e.code, e.detail)
    except ValueError as e:
        log.error('ValueError')
        await engine.remove(ReportFullTime, ReportFullTime.id == report_full_time_created.id)
        raise HTTPException(422, e)
    
    except Exception as e:
        log.error('Exception')
        log.error(e)
        await engine.remove(ReportFullTime, ReportFullTime.id == report_full_time_created.id)
        raise HTTPException(422, "Algo ocurrió mal")
    application = ApplicationResponse.from_orm(application)
    response = ReportFullTimeResponse(
        **dict(application),
        report_full_time=report_full_time_created
    )
    return response


@router.get("/{id}", response_model=ReportFullTimeResponse)
async def get_report_full_time(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> ReportFullTimeResponse:
    """
    Endpoint to ger a report_full_time model from mongo

        path-params:
            -id: int, this is the id of the application, not of mongo

        response:
            -body: full_time
    """
    try:
        application = crud.application.get(db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        if application:
            report_full_time = await crud.report_full_time.get(engine, id=mongo_id)
    except (BaseErrors, OSError) as e:
        log.error(e, type(e))
        raise (
            HTTPException(e.code, e.detail)
            if isinstance(BaseErrors)
            else HTTPException(422, "La dedicación exclusiva que busca no existe."))
    application_response = ApplicationResponse.from_orm(application)
    response = ReportFullTimeResponse(
        **dict(application_response),
        report_full_time=report_full_time
    )
    return response

@router.delete("/{id}", response_model=Msg)
async def delete_report_full_time(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Msg:
    """
    Endpoint to delete an application of type full_time

        params:
            -id: int, this is the id of the application and not of mongo

        response:
            -msg: Msg
    """
    try:
        # First get the application from postgresql
        application = crud.application.get(db, current_user, id=id)
        # get id from the model sql
        mongo_id = ObjectId(application.mongo_id)
        # Delete object in postgresql
        delete = crud.application.delete(db, current_user, id=id)
        log.debug(delete)
        if delete:
            log.debug('Estamos en delete')
            # delete object on Mongo
            await crud.report_full_time.delete(engine, id=mongo_id)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return Msg(msg="Informe de dedicación exclusiva eliminado correctamente")

@router.put("/{id}", status_code=200)
async def update_report_full_time(
    id: int,
    report_full_time: ReportFullTimeUpdate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> ReportFullTime:
    """
    Endpoint to update an application of type economic support

        params:
            -body: EconomicSupportUpdate

        path-params:
            -id: int, this is the id of the application and not the mongo_id

        response:
            -body: EconomicSupport
    """
    try:

        application: Application = crud.application.get(
            db=db, id=id, who=current_user)

        if application:
            log.debug('obj_in que es', report_full_time)

            # In MongoDB
            mongo_id = ObjectId(application.mongo_id)

            current_report_full_time = await crud.report_full_time.get(engine, id=mongo_id)
            update_report_full_time = await crud.report_full_time.update(engine, db_obj=current_report_full_time, obj_in=report_full_time)

            log.debug('update_report_full_time', update_report_full_time)

            # In PostgreSQL
            application_updated = crud.application.update(
                db, current_user, db_obj=application, obj_in=report_full_time)

            # Asegurar que es application_update.
            application = ApplicationResponse.from_orm(application_updated)

            log.debug('application update', application_updated)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)

    response = ReportFullTimeResponse(
        **dict(application),
        report_full_time=update_report_full_time
    )

    return update_report_full_time
