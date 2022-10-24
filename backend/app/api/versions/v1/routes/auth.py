from datetime import timedelta

from fastapi import Depends, APIRouter, Body, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.services import crud
from app.domain import models, schemas
from app.domain.schemas.errors.base import BaseErrors
from app.services.security import jwt
from app.core.config import get_app_settings
from app.api.middlewares import db

settings = get_app_settings()

router = APIRouter()


@router.post("/access-token", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(db.get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    try:
        user: models.User = crud.user.authenticate(
            db, email=form_data.username, identificacion=form_data.username, password=form_data.password)
        minutes = settings.access_token_expires_minutes
        access_token_expires = timedelta(
            minutes=minutes)
        access_token = jwt.create_access_token(
            user.id, expires_delta=access_token_expires
        )
        response = schemas.Token(access_token=access_token,
                                token_type='bearer', expires=minutes/24/60)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return response
