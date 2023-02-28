from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.services import crud, emails, documents
from app.domain.models import Vacation, User, Application
from app.domain.schemas import (ApplicationCreate,
                                VacationCreate,
                                VacationUpdate,
                                VacationResponse,
                                Msg,
                                ApplicationResponse,
                                Application_statusCreate)
from app.domain.errors import BaseErrors

router = APIRouter()

log = get_logging(__name__)

# crea una solicitud de vacacion


@router.post("/", response_model=VacationResponse)
async def create_vacation(
    vacation: VacationCreate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> VacationResponse:
    """
    Endpoint to create a application type vacation

        params:
            - body: VacationCreate

        response:
            - Vacation
    """
    try:
        # En la BD de mongo
        vacation_create = await crud.vacation.create(
            db=engine,
            obj_in=Vacation(**dict(vacation))
        )

        # En la BD de PostgreSQL
        application = ApplicationCreate(
            mongo_id=str(vacation_create.id),
            application_sub_type_id=vacation.application_sub_type_id,
            user_id=current_user.id
        )

        application = crud.application.create(
            db=db,
            who=current_user,
            obj_in=application
        )

        mongo_id = ObjectId(application.mongo_id)

        application = ApplicationResponse.from_orm(application)
        response = VacationResponse(
            **dict(application, vacation=vacation_create))
        
        path = documents.fill_vacations_format(current_user, vacation_create)
        await crud.vacation.update_document(engine, id=mongo_id, name='formato-vacaciones.xlsx', path=path)

    except BaseErrors as e:
        await engine.remove(Vacation, Vacation.id == vacation_create.id)
        log.error('BaseErrors')
        raise HTTPException(e.code, e.detail)

    except ValueError as e:
        log.error('ValueError')
        await engine.remove(Vacation, Vacation.id == vacation_create.id)
        raise HTTPException(422, e)

    except Exception as e:
        log.error('Exception')
        log.error(e)
        await engine.remove(Vacation, Vacation.id == vacation_create.id)
        raise HTTPException(422, "Algo ocurrió mal")

    return response

# trae una solicitud de vacacion expecifica del usuario


@router.get("/{id}", response_model=VacationResponse)
async def get_vacation(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> VacationResponse:

    try:
        application = crud.application.get(db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)

        if application:
            vacation = await crud.vacation.get(engine, id=mongo_id)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)

    application_response = ApplicationResponse.from_orm(application)
    response = VacationResponse(
        **dict(application_response), vacation=vacation)

    return response


@router.put("/{id}", status_code=200)
async def update_vacation(
    id: int,
    vacation: VacationUpdate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Vacation:
    """
    Endpoint to update an application of type Vacation

        params:
            -body: VacationUpdate

        path-params:
            -id: int, this is the id of the application and not the mongo_id

        response:
            -body: Vacation
    """

    try:
        application: Application = crud.application.get(
            db=db, id=id, who=current_user)
        
        if application:
            log.debug('obj_in que es', vacation)

            # In MongoDB
            mongo_id = ObjectId(application.mongo_id)

            current_vacation = await crud.vacation.get(engine, id=mongo_id)
            update_vacation = await crud.vacation.update(engine, db_obj=current_vacation, obj_in=vacation)

            log.debug('updated_commission', update_vacation)


            # In PostgreSQL
            application_updated = crud.application.update(
                db, current_user, db_obj=application, obj_in=vacation)
            
            log.debug('application update', application_updated)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)

    return update_vacation

@router.delete("/{id}", response_model=Msg)
async def delete_vacation(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Msg:
    """
    Endpoint to delete an application of type commission

        params:
            -id: int, this is the id of the application and not of mongo

        response:
            -msg: Msg
    """

    try:
        application = crud.application.get(db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        delete = crud.application.delete(db, current_user, id=id)
        log.debug(delete)
        if delete:
            log.debug('Estamos en delete')
            await crud.vacation.delete(engine, id=mongo_id)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    
    return Msg(msg="Vacacion eliminada correctamente")