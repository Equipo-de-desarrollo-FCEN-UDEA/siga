from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException

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


@router.get("/users", status_code=200, response_model=List[schemas.RolResponse])
def read_users(
    *,
    db: Session = Depends(db.get_db),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Endpoint to read all roles.

        params: skip: int, limit: int
    """
    try:
        db_empleado = crud.rol.get_expose(
            db, skip=skip, limit=limit)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_empleado

@router.post("/", status_code=201,
             response_model=schemas.UserRolResponse)
def create_userrol(
    *,
    db: Session = Depends(db.get_db),
    id_user: str,
    rol_id: str
    ) -> schemas.UserResponse:
    """
    Endpoint to create a new userrol.

        params: user: UserRolCreate
    """
    # Esta descripción de la función es importante en algunos casos, como para explicar qué recibe el backend
    try:
        userrol = crud.userrol.create(db=db, id_user = id_user,rol_id = rol_id)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    except KeyError as e:
        raise HTTPException(status_code=422, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    # Dentro de la función estará el controlador que lo que hace es redireccionar los datos del middleware y la request al servicio
    return userrol