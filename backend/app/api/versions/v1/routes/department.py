from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.domain import schemas
from app.domain.errors.base import BaseErrors
from app.services import crud

router = APIRouter()


@router.get("/", status_code=200, response_model=List[schemas.DeparmentInDB])
def read_deparment(
    *,
    db: Session = Depends(db.get_db),
    super_empleado: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Endpoint to read all empleados.

        params: skip: int, limit: int
    """
    try:
        db_empleado = crud.department.get_multi(
            db=db, skip=skip, limit=limit, who=super_empleado)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_empleado