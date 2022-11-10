from typing import Any, List

from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse

from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.domain import models, schemas
from app.domain.errors.base import BaseErrors
from app.services import crud
from app.core.logging import get_logging

router = APIRouter()

log = get_logging(__name__)


@router.get("/", status_code=200,
            response_model=List[schemas.ApplicationMultiResponse])
def read_applications(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
    search: str | None = '',
    type: int = 0,
    filed: bool = False
) -> Any:
    """
    Endpoint to read all applications.

        params: skip: int, limit: int
    """
    try:
        db_application = crud.application.get_multi(
            db=db, skip=skip, limit=limit, who=current_user, search=search, type=type, filed=filed)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_application


@router.get("/{id}", status_code=200,
            response_model=schemas.ApplicationMultiResponse)
def read_application(
    id: int,
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user)
) -> schemas.ApplicationMultiResponse:
    """
    Endpoint to read an application.

        params: id: int
    """
    try:
        db_application = crud.application.get(db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    return db_application


@router.delete("/{id}", status_code=200)
def delete_application(
    id: int,
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user)
) -> Any:
    """
    Endpoint to delete an application.

        params: id: int
    """
    try:
        db_obj = crud.application.get(db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    try:
        db_application = crud.application.delete(
            db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return JSONResponse(status_code=status.HTTP_200_OK, content={
        'detail': 'application deleted'
    })


@router.post("/", response_model=schemas.ApplicationMultiResponse)
def get_application(
    application: schemas.ApplicationCreate,
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user)
) -> schemas.ApplicationMultiResponse:
    """
    Endpoint to create an application
    """
    try:
        db_obj = crud.application.create(db, current_user, obj_in=application)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_obj
