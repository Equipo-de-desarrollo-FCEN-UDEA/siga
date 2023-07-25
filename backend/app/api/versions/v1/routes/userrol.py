from typing import Any, List

from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse


from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.domain import schemas
from app.domain.errors.base import BaseErrors
from app.services import crud

router = APIRouter()


@router.get("/roles", status_code=200, response_model=List[schemas.UserRolResponse])
def read_roles(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Endpoint to read all roles.

        params: skip: int, limit: int
    """
    try:
        db_empleado = crud.userrol.get_multi(
            db=db, skip=skip, limit=limit, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_empleado


@router.get("/users", status_code=200, response_model=List[schemas.UserRolResponse])
def read_users(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    rol_id: int,
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Endpoint to read all roles.

        params: skip: int, limit: int
    """
    try:
        db_empleado = crud.userrol.get_users(
            db, skip=skip, limit=limit, who=current_user, lookrol=rol_id)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_empleado

@router.get("/rolbyiduser", status_code=200, response_model=List[schemas.UserRolResponse])
def read_rol_by_iduser(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    user_id: int,
) -> Any:
    """
    Endpoint to read all roles.

        params: skip: int, limit: int
    """
    try:
        db_empleado = crud.userrol.get_rol_by_iduser(
            db, who=current_user, user_id=user_id)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_empleado

@router.post("/", status_code=201,
             response_model=schemas.UserRolResponse)
def create_userrol(
    *,
    db: Session = Depends(db.get_db),
    identification: str,
    rol_id: str,
    description: str,
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    ) -> schemas.UserResponse:
    """
    Endpoint to create a new userrol.

        params: user: UserRolCreate
    """
    # Esta descripción de la función es importante en algunos casos, como para explicar qué recibe el backend
    try:
        db_empleado = crud.user.get_by_identification(
        db, identification=identification)
    except BaseErrors as e:
            raise HTTPException(status_code=e.code, detail=e.detail)
    try:
        userrol = crud.userrol.create(db=db, user = db_empleado,rol_id = rol_id, description=description, current_user=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    except KeyError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    # Dentro de la función estará el controlador que lo que hace es redireccionar los datos del middleware y la request al servicio
    return userrol
    

@router.delete("/{id}", status_code=200)
def delete_userrol(
    id: int,
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
) -> Any:
    """
    Endpoint to delete an user.

        params: id: int
    """
    try:
        db_obj = crud.userrol.get_rol_by_iduser(db=db, who=current_user, user_id=id)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    for obj in db_obj:
        try:
            db_userrol = crud.userrol.delete(db=db, id=obj.id, who=current_user)
        except BaseErrors as e:
            raise HTTPException(status_code=e.code, detail=e.detail)
    return JSONResponse(status_code=status.HTTP_200_OK, content={
        'detail': 'Userrol(s) deleted'
    })

