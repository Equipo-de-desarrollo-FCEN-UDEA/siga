from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.services import crud, emails
from app.domain.models import FullTime, User, Application
from app.domain.schemas import (ApplicationCreate,
                                FullTimeCreate,
                                FullTimeUpdate,
                                Msg,
                                FullTimeResponse,
                                ApplicationResponse,
                                InitialLetter,
                                WorkPlan,
                                ViceFormat
                                )
from app.domain.errors import BaseErrors


router = APIRouter()

log = get_logging(__name__)


@router.post("/", response_model=FullTimeResponse)
async def create_full_time(
    full_time: FullTimeCreate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> FullTimeResponse:
    """
    Endpoint to create a application type full_time

        params:
            - body: full_timeCreate

        response:
            - full_time
    """
    try:
        full_time_created = await crud.full_time.create(db=engine,
                                                          obj_in=FullTime(**dict(full_time)))

        application = ApplicationCreate(
            mongo_id=str(full_time_created.id),
            application_sub_type_id=full_time.application_sub_type_id,
            user_id=current_user.id
        )
        application = crud.application.create(
            db=db, who=current_user, obj_in=application)
    except BaseErrors as e:
        await engine.remove(full_time, full_time.id == full_time_created.id)
        log.error('BaseErrors')
        raise HTTPException(e.code, e.detail)
    except ValueError as e:
        log.error('ValueError')
        await engine.remove(full_time, full_time.id == full_time_created.id)
        raise HTTPException(422, e)
    except Exception as e:
        log.error('Exception')
        log.error(e)
        await engine.remove(full_time, full_time.id == full_time_created.id)
        raise HTTPException(422, "Algo ocurrió mal")
    application = ApplicationResponse.from_orm(application)
    response = FullTimeResponse(
        **dict(application),
        full_time=full_time_created
    )
    return response


@router.get("/", response_model=list[FullTime])
async def get_full_times(*,
                          engine: AIOSession = Depends(mongo_db.get_mongo_db)) -> list[FullTime]:

    full_timees = await engine.find(FullTime)
    return full_timees


@router.get("/{id}", response_model=FullTimeResponse)
async def get_full_time(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> FullTimeResponse:
    """
    Endpoint to ger a full_time model from mongo

        path-params:
            -id: int, this is the id of the application, not of mongo

        response:
            -body: full_time
    """
    try:
        application = crud.application.get(db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        if application:
            full_time = await crud.full_time.get(engine, id=mongo_id)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    application_response = ApplicationResponse.from_orm(application)
    response = FullTimeResponse(
        **dict(application_response),
        full_time=full_time
    )
    return response


@router.put("/{id}", status_code=200)
async def update_full_time(
    id: int,
    full_time: FullTimeUpdate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> FullTime:
    """
    Endpoint to update an application of type full_time

        params:
            -body: full_timeUpdate

        path-params:
            -id: int, this is the id of the application and not the mongo_id

        response:
            -body: full_time
    """

    try:
        # GET In PostgreSQL
        application: Application = crud.application.get(
            db=db, id=id, who=current_user)

        if application:

            log.debug('obj_in que es', full_time)

            # In MongoDB
            mongo_id = ObjectId(application.mongo_id)

            current_full_time = await crud.full_time.get(engine, id=mongo_id)

            updated_full_time = await crud.full_time.update(engine, db_obj=current_full_time, obj_in=full_time)

            log.debug('updated_full_time', updated_full_time)

            # In PostgreSQL
            application_updated = crud.application.update(
                db=db, who=current_user, db_obj=application, obj_in=full_time)

            log.debug('application update', application_updated)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)

    return updated_full_time


@router.delete("/{id}", response_model=Msg)
async def delete_full_time(
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
            await crud.full_time.delete(engine, id=mongo_id)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return Msg(msg="Comisión eliminada correctamente")


@router.put('/letter/{id}')
async def update_letter(
    id: int,
    letter: InitialLetter,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> FullTime:
    try:
        application: Application = crud.application.get(
            db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        full_time = await crud.full_time.letter(engine,
                                                  id=mongo_id, letter=letter)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return full_time


@router.put('/vice-format/{id}')
async def update_vice_format(
    id: int,
    vice_format: ViceFormat,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> FullTime:
    try:
        application: Application = crud.application.get(
            db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        full_time = await crud.full_time.vice_format(engine,
                                                       id=mongo_id, vice_format=vice_format)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return full_time


@router.put('/work-plan/{id}')
async def update_work_plan(
    id: int,
    work_plan: WorkPlan,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> FullTime:
    try:
        application: Application = crud.application.get(
            db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        full_time = await crud.full_time.work_plan(engine,
                                                     id=mongo_id, work_plan=work_plan)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return full_time
