from datetime import timedelta

from fastapi import Depends, APIRouter, HTTPException, Body
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.services import crud
from app.domain import models, schemas
from app.domain.errors.base import BaseErrors
from app.services.security import jwt
from app.services.emails.user import recovery_password_email, confirm_email
from app.core.config import get_app_settings
from app.api.middlewares import db

settings = get_app_settings()

router = APIRouter()


# Route for authenticate users, authentication can be with email or identification number
@router.post("/access-token", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(db.get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    OAuth2 compatible token login, get an access token for future requests

        authentication can be with email or identification number
    """
    try:
        user = crud.user.get_by_email(
        db, email=form_data.username) or crud.user.get_by_identification(db, identification=form_data.username)
        if not user:
            raise HTTPException(
                status_code=401,
                detail="El correo o la contraseña están erradas",
            )
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


# Route for recovery password with email or identification
@router.post("/password-recovery/{email}", response_model=schemas.Msg)
def recover_password(email: str, *, db: Session = Depends(db.get_db)) -> dict:
    """
    Password Recovery
    """
    user = crud.user.get_by_email(
        db, email=email) or crud.user.get_by_identification(db, identification=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="El usuario con este correo o número de identificación no está registrado en el sistema",
        )
    email_token = jwt.email_token(email=user.email)
    recovery_password_email.apply_async(
        args=(user.names, email_token, user.email))
    return {"msg": f"El correo para recuperar la contraseña fue enviado correctamente a {user.email}"}


# Route for reset password
@router.post("/reset-password/", response_model=schemas.Msg)
def reset_password(
    token: str = Body(...),
    new_password: str = Body(...),
    *,
    db: Session = Depends(db.get_db)
) -> dict:
    """
    Reset password

    Params: 
        token: str
        new_password: str
    """
    try:
        email = jwt.decode_token(token).sub
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
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


# Route for request an activation email
@router.post("/activate-email/{email}", response_model=schemas.Msg)
def activate_email(email: str, *, db: Session = Depends(db.get_db)) -> dict:
    """
    activate email

    Query params:
        email: str
    """
    user = crud.user.get_by_email(
        db, email=email) or crud.user.get_by_identification(db, identification=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="El usuario con este correo o número de identificación no está registrado en el sistema",
        )
    if user.active:
        raise HTTPException(
            status_code=403,
            detail="El usuario con este correo o número de identificación ya está activo",
        )
    email_token = jwt.email_token(email=user.email)
    confirm_email.apply_async(args=(user.names, email_token, user.email))
    return {"msg": f"El correo de activación fue enviado a {user.email}"}


# Route for activate the account with the mailed token
@router.post("/activate-account/", response_model=schemas.Msg)
def reset_password(
    token: str = Body(...),
    *,
    db: Session = Depends(db.get_db)
) -> dict:
    """
    Activate account:

    Params:
        token: str
    """
    try:
        email = jwt.decode_token(token).sub
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    if not email:
        raise HTTPException(status_code=400, detail="Invalid token")
    user = crud.user.get_by_email(db, email=email)
    if not user:
        raise HTTPException(
            status_code=404,
            detail="El usuario con ese correo electrónico no existe",
        )
    user.active = True
    db.add(user)
    db.commit()
    return {"msg": "Cuenta activada correctamente"}
