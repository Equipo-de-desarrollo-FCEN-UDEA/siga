from typing import Union, Dict, Any

from app.domain.models import Permission
from app.domain.schemas import PermissionCreate, PermissionUpdate
from app.domain.errors.applications.permission import *
from app.domain.policies.base import Base


class PermissionPolicy(Base[Permission, PermissionCreate, PermissionUpdate]):

    def create(self, remunerated_permissions):

        # Permisos remunerados son igual o mayor a 1
        if remunerated_permissions >= 1:
            raise permission_401
        
        return None
