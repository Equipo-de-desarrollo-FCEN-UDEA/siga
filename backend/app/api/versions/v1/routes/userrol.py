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
