from typing import Optional

from pydantic import BaseModel


class Token(BaseModel):
    access_token: str
    token_type: str
    expires: int


class TokenPayload(BaseModel):
    sub: Optional[int] = None