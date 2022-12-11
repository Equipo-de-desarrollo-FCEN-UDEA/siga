from typing import List
from app.core.logging import get_logging
from odmantic.session import AIOSession
from sqlalchemy.orm import Session
from bson.objectid import ObjectId


from datetime import datetime
import dateutil.parser

from app.domain.models import Permission, Application, User, Application_status
from app.domain.schemas import PermissionUpdate, PermissionCreate
from app.domain.policies.applications.permission import PermissionPolicy
from .base import CRUDBase


log = get_logging(__name__)


class CRUDPermission(CRUDBase[Permission, PermissionCreate, PermissionUpdate, PermissionPolicy]):

    # ---------- CREATE PERMISSIONS ----------
    # Buscar numero de permisos remunerados en el semestre
    # Si es más de uno no debe poder crear otro
    async def create(
        self,
        db: Session,
        engine: AIOSession,
        who: User,
        obj_in: PermissionCreate,
        start_date: datetime,
        type_permission: int = 0
    ) -> PermissionCreate:

        permissions_user = self.get_approved_permissions(db=db,
                                                         who=who,
                                                         type_permission=type_permission)

        log.debug('permissions_user', permissions_user)

        remunerated_permissions = await self.get_remunerated_permissions(engine=engine,
                                                                         permissions_user=permissions_user,
                                                                         start_date=start_date)

        log.debug('remunerated_permissions', remunerated_permissions)

        self.policy.create(remunerated_permissions=remunerated_permissions)

        log.debug('salio de la policy', obj_in)

        return await engine.save(obj_in)

    
    # ---------- UPDATE PERMISSIONS ----------
    # Buscar numero de permisos remunerados en el semestre
    # Si es más de uno no debe poder cambiarlo a remunerado
    async def update(
        self,
        db: Session,
        engine: AIOSession,
        who: User,
        *,
        db_obj: Permission,
        obj_in: PermissionUpdate,
        type_permission: int = 0,
        start_date: datetime
    ) -> PermissionUpdate:

        permissions_user = self.get_approved_permissions(db=db,
                                                         who=who,
                                                         type_permission=type_permission)

        log.debug('permissions_user', permissions_user)

        remunerated_permissions = await self.get_remunerated_permissions(engine=engine,
                                                                         permissions_user=permissions_user,
                                                                         start_date=start_date)

        log.debug('remunerated_permissions', remunerated_permissions)

        self.policy.create(remunerated_permissions=remunerated_permissions)

        log.debug('salio de la policy', obj_in)

        db_obj.update(obj_in)
        return await engine.save(db_obj)

    # ---------- GET APPROVED PERMISSIONS ----------

    def get_approved_permissions(
        self,
        db: Session,
        who: User,
        type_permission: int = 0
    ) -> list:

        ids_mongo = []

        # 7: Permiso remunerado
        if type_permission == 7:

            # Application_status.status_id == 3 es APROBADO
            # Join tablas Application_status y Application por id
            permissions_user = db.query(Application.mongo_id).join(
                Application_status, Application.id == Application_status.application_id).\
                filter(Application_status.status_id == 3).\
                filter(Application.application_sub_type_id == 7).\
                filter(Application.user_id == who.id).all()

            ids_mongo = [ObjectId(obj[0]) for obj in permissions_user]

            log.debug('ids_mongo ObjectId', ids_mongo)

        return ids_mongo

    # ---------- GET REMUNERATED PERMISSIONS ----------

    async def get_remunerated_permissions(
        self,
        engine: AIOSession,
        permissions_user: list,
        start_date: datetime
    ) -> int:

        # Verificar numero de permisos remunerados aprobados en el semestre
        remunerated_permissions = 0
        if len(permissions_user) > 0:

            #today = datetime.now()

            log.debug('month: ', start_date, start_date.month, start_date.year)

            if start_date.month < 7:
                begin_semester = dateutil.parser.isoparse(
                    f'{start_date.year}-01-01T00:00:00.000Z')
                end_semester = dateutil.parser.isoparse(
                    f'{start_date.year}-06-30T00:00:00.000Z')
            else:
                begin_semester = dateutil.parser.isoparse(
                    f'{start_date.year}-07-01T00:00:00.000Z')
                end_semester = dateutil.parser.isoparse(
                    f'{start_date.year}-12-31T00:00:00.000Z')

            log.debug('begin and end semester ', begin_semester, end_semester)

            where = {
                "_id": {"$in": permissions_user},
                "start_date": {"$gt": begin_semester, "$lt": end_semester},
            }

            # Busca en MongoDB todos los permisos que empiezan en el semestre elegido
            remunerated_permissions = await engine.count(self.model, where)
            log.debug('remunerated_permissions: ', remunerated_permissions)

        return remunerated_permissions

policy = PermissionPolicy()

permission = CRUDPermission(Permission, policy=policy)
