from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging

from app.domain.models import User
from app.domain.schemas import ApplicationResponse

router = APIRouter()

log = get_logging(__name__)


@router.get("/{application_id}/user/{user_id}", response_model=ApplicationResponse)
async def get_economic_support_by_coordinator(
    application_id: int,
    user_id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
)-> ApplicationResponse:
    pass