from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.services import crud
from app.domain.schemas import Application_statusCreate, Application_statusInDB
from app.domain.models import User
from app.domain.errors import BaseErrors

router = APIRouter()

@router.post('/', response_model=Application_statusInDB)
def create_application_status(
    application_status: Application_statusCreate,
    *,
    db: Session = Depends(db.get_db),
    current_user: User = Depends(jwt_bearer.get_current_active_user)
) -> Application_statusInDB:
    try:
        application_status_response = crud.application_status.create(db, current_user, obj_in=application_status)
    except BaseErrors as e:
        HTTPException(status_code=e.code, detail=e.detail)
    return application_status_response