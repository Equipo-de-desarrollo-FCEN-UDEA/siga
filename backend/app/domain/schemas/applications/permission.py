from datetime import datetime

from pydantic import BaseModel, validator

from app.domain.schemas.application import ApplicationResponse


class PermissionBase(BaseModel):
    start_date: datetime
    end_date: datetime
    justification: str


class PermissionCreate(PermissionBase):
    application_sub_type_id: int


class PermissionUpdate(PermissionBase):
    pass


class PermissionResponse(ApplicationResponse):
    permission: PermissionBase