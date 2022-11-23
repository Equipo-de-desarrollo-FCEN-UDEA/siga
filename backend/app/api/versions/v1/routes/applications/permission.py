from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.services import crud
from app.domain.models import Permission, User, Application
from app.domain.schemas import ApplicationCreate, PermissionResponse, PermissionUpdate, PermissionCreate, Msg, ApplicationResponse
from app.domain.errors import BaseErrors
from app.domain.errors.applications.permission import PermissionErrors

router = APIRouter()

log = get_logging(__name__)


# ------ CREAR UN PERMISO ------
@router.post("/", status_code=201)
async def create_permission(
    permission: PermissionCreate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)):
    """
        Endpoint to create a application type Permission
            params:
                - body: PermissionCreate
            response:
                - Permission
    """
    try:
        permission_created = None

        # En la BD de mongo
        permission_created = await crud.permission.create(
            db=db,
            engine=engine,
            who=current_user,
            obj_in=Permission(**dict(permission)),
            type_permission=permission.application_sub_type_id)
        
        log.debug('permission_created', permission_created)

        # En la BD de PostgreSQL
        application = ApplicationCreate(
            mongo_id=str(permission_created.id),
            application_sub_type_id=permission.application_sub_type_id,
            user_id=current_user.id,
        )
        
        application = crud.application.create(
            db=db,
            who=current_user,
            obj_in=application
        )

        application = ApplicationResponse.from_orm(application)

        response = PermissionResponse(
            **dict(application),
            permission=permission_created
        )

    # 422 (Unprocessable Entity)
    except PermissionErrors as e:
        log.debug('PermissionErrors', e)
        return HTTPException(e.code, e.detail)
    except BaseErrors as e:
        if permission_created is not None:
            await engine.remove(Permission, Permission.id == permission_created.id)
            log.debug('BaseErrors', e)
        return HTTPException(e.code, e.detail)
    except ValueError as e:
        log.debug('ValueError', e)
        if permission_created is not None:
            await engine.remove(Permission, Permission.id == permission_created.id)
        return HTTPException(422, e)
    except Exception:
        if permission_created is not None:
            await engine.remove(Permission, Permission.id == permission_created.id)
        return HTTPException(422, "Algo ocurrió mal")

    return response


# ------ OBTENER TODOS LOS PERMISOS ------
@router.get("/", response_model=list[Permission])
async def get_permissions(
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> list[Permission]:
    """
        Endpoint to get all applications of type Permission
            response:
                - List Permission
    """
    permissions = await engine.find(Permission)
    return permissions


# ------ OBTENER UN PERMISO POR ID ------
@router.get("/{id}", response_model=PermissionResponse)
async def get_permission(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> PermissionResponse:
    """
        Endpoint to get application of type Permission
            path-params:
                -id: int, this is the id of the application, not of mongo
            response:
                - Permission
    """
    try:
        application = crud.application.get(db=db, who=current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        if application:
            permission = await crud.permission.get(engine, id=mongo_id)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)

    # from_orm: must be used to create the model instance
    application = ApplicationResponse.from_orm(application)
    response = PermissionResponse(
        **dict(application),
        permission=permission
    )
    log.debug(application)
    log.info(response)
    return response


# ------ EDITAR UN PERMISO POR ID ------
@router.put("/{id}", response_model=Permission)
async def put_permission(
    id: int,
    permission: PermissionUpdate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Permission:
    """
        Endpoint to update an application of type Permission
            params:
                -body: CommissionUpdate
            path-params:
                -id: int, this is the id of the application, not of mongo
            response:
                - Permission
    """
    try:
        application: Application = crud.application.get(
            db=db, id=id, who=current_user)
        application = crud.application.update(
            db=db, who=current_user, db_obj=application, obj_in={})
        mongo_id = ObjectId(application.mongo_id)

        if application:
            current_permission = await crud.permission.get(db=engine, id=mongo_id)
            updated_permission = await crud.permission.update(db=engine, db_obj=current_permission, obj_in=permission)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)

    return updated_permission


# ------ ELIMINAR UN PERMISO ------
@router.delete("/{id}", response_model=Msg)
async def put_permission(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Msg:
    """
        Endpoint to delete an application of type Permission
            path-params:
                -id: int, this is the id of the application, not of mongo
            response:
                - Msg: message
    """
    try:
        application: Application = crud.permission.get(db=db, id=id)
        mongo_id = ObjectId(application.mongo_id)
        # Delete from PostgreSQL
        delete = crud.application.delete(db=db, who=current_user, id=id)

        if delete:
            # Delete from mongo
            await crud.permission.delete(db=engine, id=mongo_id)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return Msg(msg="¡Permiso eliminado correctamente!")
