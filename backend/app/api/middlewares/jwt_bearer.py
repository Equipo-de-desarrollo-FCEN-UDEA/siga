from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.services import crud
from app.domain import models
from app.domain.errors.base import BaseErrors
from app.services.security.jwt import decode_token
from app.core.config import get_app_settings
from .db import get_db

settings = get_app_settings()

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"http://localhost:8001{settings.api_prefix_v1}/login/access-token"
)


# Esta función permite obtener el usuario a partir del token
def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> models.User:
    try:
        token_data = decode_token(token=token)
    except BaseErrors as e:
        raise HTTPException(
            status_code=e.code,
            detail=e.detail,
        )
    user = crud.user.get_middleware(db, id=token_data.sub)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user


# Esta función permite obtener el usuario activo desde el token con una inyección de dependencias de la función anterior
def get_current_active_user(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
) -> models.User:
    if not crud.user.is_active(db=db, user=current_user):
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user
