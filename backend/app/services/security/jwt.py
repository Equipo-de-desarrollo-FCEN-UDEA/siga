from datetime import datetime, timedelta
from typing import Any, Union

from jose import jwt
from passlib.context import CryptContext

from app.core.config import get_app_settings
from app.domain.schemas import TokenPayload
from app.domain.errors.token import token403

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
settings = get_app_settings()


def create_access_token(
    subject: Union[str, Any], *, expires_delta: timedelta = None
) -> str:
    if expires_delta:
        expires = datetime.utcnow() + expires_delta
    else:
        expires = datetime.utcnow() + timedelta(
            minutes=settings.access_token_expires_minutes
        )
    token = jwt.encode(
        {"exp": expires, "sub": str(subject)},
        settings.secret_key._secret_value,
        algorithm=settings.algorithm
    )
    return token


def check_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(plain_password: str) -> str:
    return pwd_context.hash(plain_password)


def email_token(email: str) -> str:
    expires = datetime.utcnow() + timedelta(settings.reset_password_expire_token)
    token = jwt.encode(
        {"exp": expires, "sub": email},
        settings.secret_key._secret_value,
        algorithm=settings.algorithm
    )
    return token


def hour_aval_token(identification: str) -> str:
    expires = datetime.utcnow() + timedelta(settings.aval_confirm_expire_token)
    token = jwt.encode(
        {"exp": expires, "sub": identification},
        settings.secret_key._secret_value,
        algorithm=settings.algorithm
    )
    return token


def decode_token(
    token: str,
) -> TokenPayload:
    try:
        decoded_token = jwt.decode(
            token, settings.secret_key._secret_value, algorithms=["HS256"])
        return TokenPayload(**decoded_token)
    except jwt.JWTError:
        raise token403
