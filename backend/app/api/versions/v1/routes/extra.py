from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.domain import schemas
from app.domain.errors.base import BaseErrors
from app.services import crud

router = APIRouter()

@router.get("/intern", status_code=200, response_model=List[schemas.ExtraResponse])
def read_extra_intern(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """
    Endpoint to read all extra(research groups).

        params: skip: int, limit: int
    """ 
    try:
        db_extra = crud.extra.get_multi_intern(
            db=db, skip=skip, limit=limit, who=current_user
        )
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_extra

@router.get("/intern/department/{id}", status_code=200, response_model=List[schemas.ExtraResponse])
def read_extra_by_department(
    id: int,
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
) -> List[schemas.ExtraResponse]:
    """
    Endpoint to read subdepartments by department.

        params: id: int
    """ 
    try:
        db_extra = crud.extra.get_by_department( 
            db=db, 
            who=current_user,
            department_id=id)
        
        if len(db_extra) == 0:
            raise BaseErrors(
                code=404,
                detail="No se encontraron subdepartamentos")
        
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    
    return db_extra