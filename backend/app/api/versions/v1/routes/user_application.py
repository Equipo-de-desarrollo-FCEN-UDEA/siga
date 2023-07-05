from fastapi import APIRouter, Depends, HTTPException

from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging

from app.domain.errors.base import BaseErrors

from app.domain.models import User
from app.domain.schemas import UserApplicationResponse, UserApplicationUpdate

from app.services import crud

router = APIRouter()

log = get_logging(__name__)


@router.get("/{id}/coordinator", response_model=UserApplicationResponse)
def get_application_by_coordinator(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> UserApplicationResponse:
    """
    Endpoint to read a user_application by a coordinator.

        params: id: int
    """
    try:
        db_user_application = crud.user_application.get_by_coordinator(
            db=db, who=current_user, id=id)

    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    if not db_user_application:
        raise HTTPException(
            status_code=404, detail="No se encontró la solicitud")

    return db_user_application

@router.get("/{id}", response_model=list[UserApplicationResponse])
def get_user_application(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> list[UserApplicationResponse]:
    """
    Endpoint to read all the coordinators of an user_application.

        params: id: int
    """
    try:
        db_user_application = crud.user_application.get_user_application(
            db=db, id=id)

    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    if not db_user_application:
        raise HTTPException(
            status_code=404, detail="No se encontró la solicitud")

    return db_user_application

@router.put("/{id}", response_model=UserApplicationResponse)
async def update_application_by_coordinator(
    id: int,
    user_application: UserApplicationUpdate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)

) -> UserApplicationResponse:
    """
    Endpoint to update the data of a user_application.

        params: id: int
    """
    try:
        current_user_application = crud.user_application.get_by_coordinator(
            db=db, who=current_user, id=id)

        update_user_application = crud.user_application.update_by_coordinator(
            db=db, who=current_user, id=id, db_obj=current_user_application, obj_in=user_application)

    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    return update_user_application
