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
from app.domain.errors import BaseErrors

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
            try:
                crud.application.get(db, current_user, id=report_full_time_created.full_time_id)
            except ReportFullTimeErrors as e:
                raise HTTPException(e.code, e.detail)

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
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    application_response = ApplicationResponse.from_orm(application)
    response = ReportFullTimeResponse(
        **dict(application_response),
        report_full_time=report_full_time
    )
    return response
