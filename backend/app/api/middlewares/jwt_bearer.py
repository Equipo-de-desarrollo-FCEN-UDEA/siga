from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt
from pydantic import ValidationError
from sqlalchemy.orm import Session

from app.services import crud
from app.domain import models, schemas
from app.core.config import get_app_settings
from .db import get_db

settings = get_app_settings()

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"http://localhost:8001{settings.api_prefix_v1}/login/access-token"
)


#Esta función permite obtener el usuario a partir del token
def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> models.User:
    try:
        payload = jwt.decode(
            token, str(settings.secret_key), algorithms=[settings.algorithm]
        )
        token_data = schemas.TokenPayload(**payload)
    except (jwt.JWTError, ValidationError):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    user = crud.user.get_init(db, id=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


#Esta función permite obtener el usuario activo desde el token con una inyección de dependencias de la función anterior
def get_current_active_user(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not crud.user.is_active(db=db, user=current_user):
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


#Esta función obtiene el si el usuario es o no admin
def get_current_active_superuser(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user)
) -> models.User:
    if not crud.user.is_superuser(db= db, user=current_user):
        raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = "Not a superuser")
    return current_user
