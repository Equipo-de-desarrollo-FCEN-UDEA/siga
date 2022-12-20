from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.domain import schemas
from app.domain.errors.base import BaseErrors
from app.services import crud

router = APIRouter()

@router.get("/", status_code=200,
            response_model=List[schemas.HolidayInDB])
def get_holidays(
    *,
    db: Session = Depends(db.get_db),
    user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user)
) -> Any:
    """
    Endpoint to read all holidays.

    params: db: Session,  who: user, skip: int, limit: int
    """
    try:
        db_holidays = crud.holiday.get_multi(db=db,  who=user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_holidays
