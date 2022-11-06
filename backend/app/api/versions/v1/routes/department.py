from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.domain import schemas
from app.domain.errors.base import BaseErrors
from app.services import crud

router = APIRouter()


@router.get("/intern", status_code=200, response_model=List[schemas.DepartmentResponse])
def read_deparment_intern(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Endpoint to read all deparments.

        params: skip: int, limit: int
    """
    try:
        db_department = crud.department.get_multi_intern(
            db=db, skip=skip, limit=limit, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_department


@router.get("/{school_id}", status_code=200, response_model=List[schemas.DeparmentInDB])
def read_deparment(
    school_id: int,
    *,
    db: Session = Depends(db.get_db),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Endpoint to read all deparments.

        params: skip: int, limit: int
    """
    try:
        db_department = crud.department.get_multi_by_school(
            db=db, id=school_id, skip=skip, limit=limit)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_department
