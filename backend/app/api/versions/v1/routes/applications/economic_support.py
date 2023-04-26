from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.services import crud, emails
from app.domain.models import EconomicSupport, User, Application
from app.domain.schemas import (ApplicationCreate,
                                Msg,
                                EconomicSupportCreate,
                                EconomicSupportUpdate,
                                EconomicSupportResponse,
                                ApplicationResponse,
                                Application_statusCreate)
from app.domain.errors import BaseErrors


router = APIRouter()

log = get_logging(__name__)

# crea una solicitud de apoyo económico
@router.post("/", response_model=EconomicSupportResponse)
async def create_economic_support(
    economic_supprt: EconomicSupportCreate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> EconomicSupportResponse:
    """
    Endpoint to create a application type economic support

        params:
            - body: EconomicSupportCreate

        response:
            - EconomicSupport
    """
    try:
        log.debug(economic_supprt)
        # En la BD de mongo
        economic_support_create = await crud.economic_support.create(
            db=engine,
            obj_in=EconomicSupport(**dict(economic_supprt))
        )

        # En la BD de PostgreSQL
        application = ApplicationCreate(
            mongo_id=str(economic_support_create.id),
            application_sub_type_id=economic_supprt.application_sub_type_id,
            user_id=current_user.id
        )

        application = crud.application.create(
            db=db,
            who=current_user,
            obj_in=application
        )

        
    except BaseErrors as e:
        await engine.remove(EconomicSupport, EconomicSupport.id == economic_support_create.id)
        log.error('BaseErrors')
        raise HTTPException(e.code, e.detail)

    except ValueError as e:
        log.error('ValueError')
        await engine.remove(EconomicSupport, EconomicSupport.id == economic_support_create.id)
        raise HTTPException(422, e)

    except Exception as e:
        log.error('Exception')
        log.error(e)
        await engine.remove(EconomicSupport, EconomicSupport.id == economic_support_create.id)
        raise HTTPException(422, "Algo ocurrió mal")
    
    application = ApplicationResponse.from_orm(application)

    response = EconomicSupportResponse(
            **dict(application, economic_support=economic_support_create))
    
    return response


# trae una solicitud de economic_support expecifica del usuario
@router.get("/{id}", response_model=EconomicSupportResponse)
async def get_economic_support(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> EconomicSupportResponse:

    try:
        application = crud.application.get(db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)

        if application:
            economic_support = await crud.economic_support.get(engine, id=mongo_id)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)

    application_response = ApplicationResponse.from_orm(application)
    response = EconomicSupportResponse(
        **dict(application_response), economic_support=economic_support)

    return response


@router.put("/{id}", status_code=200)
async def update_economic_support(
    id: int,
    economic_support: EconomicSupportUpdate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> EconomicSupport:
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
            log.debug('obj_in que es', economic_support)

            # In MongoDB
            mongo_id = ObjectId(application.mongo_id)

            current_economic_support = await crud.economic_support.get(engine, id=mongo_id)
            update_economic_support = await crud.economic_support.update(engine, db_obj=current_economic_support, obj_in=economic_support)

            log.debug('update_economic_support', update_economic_support)


            # In PostgreSQL
            application_updated = crud.application.update(
                db, current_user, db_obj=application, obj_in=economic_support)
            
            application = ApplicationResponse.from_orm(application_updated) #Asegurar que es application_update.
            
            log.debug('application update', application_updated)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)

    return update_economic_support

@router.delete("/{id}", response_model=Msg)
async def delete_economic_support(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Msg:
    """
    Endpoint to delete an application of type economic support

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
            await crud.economic_support.delete(engine, id=mongo_id)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    
    return Msg(msg="Solicitud eliminada correctamente")