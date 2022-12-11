from typing import Union, Dict, Any
from app.core.logging import get_logging

from app.domain.models import Permission
from app.domain.schemas import PermissionCreate, PermissionUpdate
from app.domain.errors.applications.permission import *
from app.domain.policies.base import Base

log = get_logging(__name__)

class PermissionPolicy(Base[Permission, PermissionCreate, PermissionUpdate]):

    def create(self, remunerated_permissions):

        log.debug(remunerated_permissions)

        # Permisos remunerados son igual o mayor a 1
        if remunerated_permissions >= 1:
            raise permission_403
        
        return None
