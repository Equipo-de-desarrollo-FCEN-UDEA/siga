from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session
from copy import deepcopy

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.services import crud, documents
from app.domain.models import FullTime, User, Application
from app.domain.schemas import (ApplicationCreate,
                                FullTimeCreate,
                                FullTimeUpdate,
                                Msg,
                                FullTimeResponse,
                                ApplicationResponse,
                                InitialLetter,
                                WorkPlan,
                                ViceFormat,
                                Application_statusCreate,
                                ApplicationUpdate,
                                ApplicationInDB
                                )
from app.domain.errors import BaseErrors


router = APIRouter()

log = get_logging(__name__)
settings = get_app_settings()


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
            db=db, who=current_user, obj_in=application, status=6, observation='El usuario inició la dedicación')
    except BaseErrors as e:
        await engine.remove(FullTime, FullTime.id == full_time_created.id)
        raise HTTPException(e.code, e.detail)
    except ValueError as e:
        await engine.remove(FullTime, FullTime.id == full_time_created.id)
        raise HTTPException(422, e)
    except Exception as e:

        await engine.remove(FullTime, FullTime.id == full_time_created.id)
        raise HTTPException(422, "Algo ocurrió mal")
    application = ApplicationResponse.from_orm(application)
    response = FullTimeResponse(
        **dict(application),
        full_time=full_time_created
    )
    return response

@router.post('/copy-full-time/{id}', response_model=FullTimeResponse)
async def copy_full_time(
    id: int,
    title: Optional[str] = None,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> FullTimeResponse:
    """
    Endpoint to copy a FullTime application

        params:
            - id: int, this is the id of the full time to copy
            - title: Optional[str], this is the new title for the copied full time
        response:
            - full_time
    """
    try:
        # Obtener la aplicación FullTime original
        original_application: Application = crud.application.get(db, current_user, id=id)
        original_mongo_id = ObjectId(original_application.mongo_id)
        original_full_time = await crud.full_time.get(engine, id=original_mongo_id)
        
        if original_full_time is None:
            raise HTTPException(status_code=404, detail="No se encontró la aplicación FullTime")
        
        # Crear una copia del objeto FullTime sin el id de Mongo
        full_time_copied = FullTime(**{k: v for k, v in original_full_time.dict().items() if k != 'id'})
        num_copies = 0
        
        if "_copia" in full_time_copied.title:
            num_copies += 1

        log.debug(title)
        
        if title is not None:
            full_time_copied.title = title
        else:
            full_time_copied.title += f"_copia_{num_copies}"
            
        # Guardar la copia en la base de datos
        full_time_copied = await crud.full_time.create(db=engine, obj_in=full_time_copied)
        
        new_application = ApplicationCreate(
            mongo_id=str(full_time_copied.id),
            application_sub_type_id=original_application.application_sub_type_id,
            start_date=original_application.start_date,
            user_id=current_user.id
        )
        new_application = crud.application.create(
            db=db, who=current_user, obj_in=new_application,
            status=6, observation=f'El usuario copió la dedicación exclusiva con id: {id}')
        
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    except ValueError as e:
        raise HTTPException(422, e)
    except Exception as e:
        raise HTTPException(422, "Algo ocurrió mal")
    
    new_application_response = ApplicationResponse.from_orm(new_application)
    response = FullTimeResponse(
        **dict(new_application_response),
        full_time=full_time_copied
    )
    return response


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
) -> Application:
    """
    Endpoint to update an application of type full_time

        params:
            - body: full_timeUpdate

        path-params:
            - id: int, this is the id of the application and not the mongo_id

        response:
            - body: full_time
    """

    try:
        # GET In PostgreSQL
        application: Application = crud.application.get(
                                    db=db, 
                                    id=id, 
                                    who=current_user)

        if application:
            # In MongoDB
            mongo_id = ObjectId(application.mongo_id)
            current_full_time = await crud.full_time.get(
                    engine, 
                    id=mongo_id)
            updated_full_time = await crud.full_time.update(
                    engine, 
                    db_obj=current_full_time, 
                    obj_in=full_time)

            if application.application_status[-1].status.name == "EN CREACIÓN":
                status = Application_statusCreate(
                        application_id=application.id, 
                        status_id=1, 
                        observation="Dedicación exclusiva solicitada")
                crud.application_status.request(
                        db=db, 
                        who=current_user, 
                        obj_in=status, 
                        to=application, 
                        current=updated_full_time)

            elif application.application_status[-1].status.name == "EN VICERRECTORÍA":
                application_update =  ApplicationInDB(
                        id=id,
                        created_at=application.created_at,
                        mongo_id=str(mongo_id),
                        application_sub_type_id=full_time.application_sub_type_id,
                        start_date=full_time.start_date,
                        user_id=current_user.id)
                crud.application.update(
                    db=db, 
                    who=current_user, 
                    db_obj=application, 
                    obj_in=application_update)
                return application_update
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
        if delete:
            # delete object on Mongo
            await crud.full_time.delete(engine, id=mongo_id)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return Msg(msg="Comisión eliminada correctamente")


@router.put('/request/{id}')
def solicite_full_time(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    db: Session = Depends(db.get_db)
) -> Msg:
    try:
        application = crud.application.get(db, current_user, id=id)
        update = crud.application.update(db, current_user, db_obj=application, obj_in={
        }, status=1, observation='Usuario solicitó dedicación exclusiva')
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return {'msg': 'La solicitud se solicitó correctamente'}

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
        full_time = await crud.full_time.get(engine, id=mongo_id)
        for document in full_time.documents:
            if document['name'] == 'carta-inicio.pdf':
                try:
                    pass
                except Exception as e:
                    pass
        path = await documents.initial_letter_generation(current_user, letter.body)
        full_time = await crud.full_time.letter(engine,
                                                id=mongo_id, letter=letter)
        await crud.full_time.update_document(engine, id=mongo_id, name='carta-inicio.pdf', path=path)

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

        path = documents.fill_vice_document(current_user, full_time)
        await crud.full_time.update_document(engine, id=mongo_id, name='formato-vicerrectoría.xlsx', path=path)
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
        path = documents.fill_work_plan_format(current_user, full_time)
        await crud.full_time.update_document(engine, id=mongo_id, name='plan-trabajo', path=path)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return full_time

