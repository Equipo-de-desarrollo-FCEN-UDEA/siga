from typing import Generator

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
    tokenUrl=f"http://localhost:8000{settings.api_prefix_v1}/login/access-token"
)


def get_current_usuario(
    db: Session = Depends(get_db), token: str = Depends(reusable_oauth2)
) -> models.Usuario:
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
    usuario = crud.usuario.get_init(db, id=token_data.sub)
    if not usuario:
        raise HTTPException(status_code=404, detail="User not found")
    return usuario


def get_current_active_usuario(
    db: Session = Depends(get_db),
    current_usuario: models.Usuario = Depends(get_current_usuario),
) -> models.Usuario:
    if not crud.usuario.is_active(db=db, user=current_usuario):
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_usuario

def get_current_active_superusuario(
    db: Session = Depends(get_db),
    current_usuario: models.Usuario = Depends(get_current_active_usuario)
) -> models.Usuario:
    if not crud.usuario.is_superuser(db= db, user=current_usuario):
        raise HTTPException(status_code = status.HTTP_403_FORBIDDEN, detail = "Not a superuser")
    return current_usuario
