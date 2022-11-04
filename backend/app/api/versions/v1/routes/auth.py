from datetime import timedelta

from fastapi import Depends, APIRouter, HTTPException, Body
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.services import crud
from app.domain import models, schemas
from app.domain.errors.base import BaseErrors
from app.services.security import jwt
from app.services.emails.user import recovery_password_email
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
            db, email=form_data.username, identification=form_data.username, password=form_data.password)
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


@router.post("/password-recovery/{email}", response_model=schemas.Msg)
def recover_password(email: str, db: Session = Depends(db.get_db)) -> dict:
    """
    Password Recovery
    """
    user = crud.user.get_by_email(db, email=email)

    if not user:
        raise HTTPException(
            status_code=404,
            detail="The user with this username does not exist in the system.",
        )
    password_reset_token = jwt.password_reset_token(email=email)
    recovery_password_email.apply_async(args=('simon3640xd@gmail.com', 'Test email'))
    return {"msg": password_reset_token}


@router.post("/reset-password/", response_model=schemas.Msg)
def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    db: Session = Depends(db.get_db)
) -> dict:
    """
    Reset password
    """
    email = jwt.get_email_reset_password(token)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = crud.user.get_by_email(db, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="El usuario con ese correo electrónico no existe",
        )
    elif not crud.user.is_active(db=db, user=user):
        raise HTTPException(status_code=400, detail="Inactive user")
    hashed_password = jwt.get_password_hash(new_password)
    user.hashed_password = hashed_password
    db.add(user)
    db.commit()
    return {"msg": "Contraseña actualizada correctamente"}
