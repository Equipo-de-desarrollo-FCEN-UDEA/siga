from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.domain import schemas
from app.domain.errors.base import BaseErrors
from app.services import crud

router = APIRouter()


@router.get("/", status_code=200, response_model=List[schemas.ApplicationTypeInDB])
def read_application_types(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Endpoint to read all Applications types.

        params: skip: int, limit: int
    """
    try:
        db_applicationTypes = crud.applicationType.get_multi(
            db=db, who=current_user, skip=skip, limit=limit)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_applicationTypes


@router.get("/{id}", status_code=200, response_model=schemas.ApplicationTypeResponse)
def read_application_type(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    id: int
) -> Any:
    """
    Endpoint to read one Application type.

        params: id:int
    """
    try:
        db_applicationType = crud.applicationType.get(
            db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_applicationType
