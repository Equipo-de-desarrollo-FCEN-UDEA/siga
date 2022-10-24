from datetime import datetime, timedelta
from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext

from app.core.config import get_app_settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
settings = get_app_settings()


def create_access_token(
    subject: Union[str, Any], expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expires = datetime.utcnow() + expires_delta
    else:
        expires = datetime.utcnow() + timedelta(
            minutes=settings.access_token_expires_minutes
        )
    token = jwt.encode(
        {"exp": expires, "sub": str(subject)},
        str(settings.secret_key),
        algorithm=settings.algorithm
    )
    return token


def check_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(plain_password: str) -> str:
    return pwd_context.hash(plain_password)
