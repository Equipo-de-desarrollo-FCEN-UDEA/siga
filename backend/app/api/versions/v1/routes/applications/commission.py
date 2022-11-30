from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.services import crud, documents
from app.domain.models import Commission, User, Application
from app.domain.schemas import (ApplicationCreate, CommissionCreate,
                                CommissionUpdate, Msg, CommissionResponse, ApplicationResponse, Compliment)
from app.domain.errors import BaseErrors


router = APIRouter()

log = get_logging(__name__)


@router.post("/", response_model=CommissionResponse)
async def create_commission(
    commission: CommissionCreate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> CommissionResponse:
    """
    Endpoint to create a application type Commission

        params:
            - body: CommissionCreate

        response:
            - Commission
    """
    try:
        commission_created = await crud.commission.create(db=engine,
                                                          obj_in=Commission(**dict(commission)))

        log.debug('commission_created', commission_created)
        application = ApplicationCreate(
            mongo_id=str(commission_created.id),
            application_sub_type_id=commission.application_sub_type_id,
            user_id=current_user.id
        )
        log.debug('application', application)
        application = crud.application.create(
            db=db, who=current_user, obj_in=application)
    except BaseErrors as e:
        await engine.remove(Commission, Commission.id == commission_created.id)
        raise HTTPException(e.code, e.detail)
    except ValueError as e:
        await engine.remove(Commission, Commission.id == commission_created.id)
        raise HTTPException(422, e)
    except Exception:
        await engine.remove(Commission, Commission.id == commission_created.id)
        raise HTTPException(422, "Algo ocurrió mal")
    application = ApplicationResponse.from_orm(application)
    log.debug(commission_created)
    response = CommissionResponse(
        **dict(application),
        commission=commission_created
    )
    return response


@router.get("/", response_model=list[Commission])
async def get_commissions(*,
                          engine: AIOSession = Depends(mongo_db.get_mongo_db)) -> list[Commission]:

    commissiones = await engine.find(Commission)
    return commissiones


@router.get("/{id}", response_model=CommissionResponse)
async def get_commission(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> CommissionResponse:
    """
    Endpoint to ger a commission model from mongo

        path-params:
            -id: int, this is the id of the application, not of mongo

        response:
            -body: Commission
    """
    try:
        application = crud.application.get(db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        if application:
            commission = await crud.commission.get(engine, id=mongo_id)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    application_response = ApplicationResponse.from_orm(application)
    response = CommissionResponse(
        **dict(application_response),
        commission=commission
    )
    return response


@router.put("/{id}", response_model=Commission)
async def update_commission(
    id: int,
    commission: CommissionUpdate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Commission:
    """
    Endpoint to update an application of type Commission

        params:
            -body: CommissionUpdate

        path-params:
            -id: int, this is the id of the application and not the mongo_id

        response:
            -body: Commission
    """
    try:
        application: Application = crud.application.get(
            db, current_user, id=id)
        # For apply policies it will end if some policy is not ok
        application = crud.application.update(
            db, current_user, db_obj=application, obj_in={})
        mongo_id = ObjectId(application.mongo_id)
        if application:
            current_commission = await crud.commission.get(engine, id=mongo_id)
            updated_commission = await crud.commission.update(
                engine, db_obj=current_commission, obj_in=commission)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return updated_commission


@router.delete("/{id}", response_model=Msg)
async def delete_commission(
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
            await crud.commission.delete(engine, id=mongo_id)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return Msg(msg="Comisión eliminada correctamente")


@router.put('/compliment/{id}')
async def update_compliment(
    id: int,
    compliment: Compliment,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Commission:
    try:
        application: Application = crud.application.get(
            db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        commission = await crud.commission.compliment(engine,
                                                      id=mongo_id, compliment=compliment.compliment)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return commission
