from typing import Any
from datetime import datetime

from pydantic import BaseModel, validator, Field

from app.domain.schemas.application import ApplicationResponse


class PermissionBase(BaseModel):
    start_date: datetime
    end_date: datetime
    justification: str = Field(max_length=500, min_length=30)
    documents: list[Any] | None


class PermissionCreate(PermissionBase):
    application_sub_type_id: int


class PermissionUpdate(PermissionBase):
    application_sub_type_id: int

class PermissionInDB(PermissionBase):
    resolution: str | None

class PermissionResponse(ApplicationResponse):
    permission: PermissionInDB


class PermissionDocument(PermissionBase):
    @validator("start_date", 'end_date')
    def stringdate(cls, v, values, **kwargs):
        return v.strftime("%A %d de %B del %Y")