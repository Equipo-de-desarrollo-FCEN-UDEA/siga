from typing import Any, Dict, List, Union

from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse

from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.domain import models, schemas
from app.domain.schemas.errors.base import BaseErrors
from app.services import crud
from app.core.logging import get_logging

router = APIRouter()

log = get_logging(__name__)


# Este decorador nos permite generar un endpoint de tipo post
@router.post("/", status_code=201,
             response_model=schemas.UserResponse)
def create_user(
    *,
    db: Session = Depends(db.get_db),
    super_user: models.User = Depends(jwt_bearer.get_current_active_superuser),
    user: schemas.UserCreate
) -> Any:
    """
    Endpoint to create a new user.

        params: user: UserCreate
    """
    # Esta descripción de la función es importante en algunos casos, como para explicar qué recibe el backend
    try:
        db_user = crud.user.create(
            db=db, obj_in=user, who=super_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    except KeyError as e:
        HTTPException(status_code=422, detail=str(e))
    except ValueError as e:
        HTTPException(status_code=422, detail=str(e))

    # Dentro de la función estará el controlador que lo que hace es redireccionar los datos del middleware y la request al servicio
    return db_user


@router.get("/", status_code=200,
            response_model=List[schemas.UserResponse])
def read_users(
    *,
    db: Session = Depends(db.get_db),
    super_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_superuser),
    skip: int = 0,
    limit: int = 100,
    search: str | None = '',
    activo: bool | None = True,
) -> Any:
    """
    Endpoint to read all users.

        params: skip: int, limit: int
    """
    try:
        db_user = crud.user.get_multi(
            db=db, skip=skip, limit=limit, who=super_user, search=search, activo=activo)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_user


@router.get("/{id}", status_code=200,
            response_model=schemas.UserResponse)
def read_user(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    id: int
) -> schemas.UserResponse:
    """
    Endpoint to read an user.

        params: id: int
    """
    try:
        if id == 0:
            return current_user

        db_user = crud.user.get(db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    return db_user


@router.put("/{id}", status_code=200,
            response_model=schemas.UserResponse)
def update_user(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_superuser),
    user_in: Union[schemas.UserUpdate, Dict[str, Any]],
    id: int
) -> schemas.UserResponse:
    """
    Endpoint to update an user.
    """
    try:
        user = crud.user.get(db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    return crud.user.update(db=db, db_obj=user, obj_in=user_in, who=current_user)


@router.put("/{id}/new-password", status_code=200,
            response_model=schemas.UserResponse)
def update_user_password(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_superuser),
    password: str,
    confirmpassword: str,
    id: int
) -> schemas.UserResponse:
    """
    Endpoint to update an user.
    """
    try:
        user = crud.user.get(db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    return crud.user.update_password(
        db=db, db_obj=user, password=password, confirmPassword=confirmpassword, who=current_user
    )


@router.delete("/{id}", status_code=200)
def delete_user(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    id: int
) -> Any:
    """
    Endpoint to delete an user.

        params: id: int
    """
    try:
        db_obj = crud.user.get(db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    try:
        db_user = crud.user.delete(db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return JSONResponse(status_code=status.HTTP_200_OK, content={
        'detail': 'User deleted'
    })
