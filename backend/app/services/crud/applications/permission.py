from typing import List
from app.core.logging import get_logging
from odmantic.session import AIOSession
from sqlalchemy.orm import Session
from bson.objectid import ObjectId


from datetime import datetime
import dateutil.parser

from app.domain.models import Permission, Application, User, Application_status
from app.domain.schemas import PermissionUpdate, PermissionCreate, ApplicationCreate
from app.domain.policies import ApplicationPolicy
#from app.domain.policies.applications.permission import
from app.services.crud.application import CRUDBase

log = get_logging(__name__)


class CRUDPermission(CRUDBase[Permission, PermissionCreate, PermissionUpdate, ApplicationPolicy]):

    # def __init__(self, model: Permission, policy: ApplicationPolicy):
    #     """Factory crud with odm"""
    #     self.model = model
    #     self.policy = policy

    # Buscar numero de permisos remunerados en el semestre
    # Si es más de uno no debe crear otro

    # async def create(self,
    #     db: Session,
    #     engine: AIOSession,
    #     who: User,
    #     obj_in: PermissionCreate,
    #     type_permission: int = 0
    #     ) -> Permission:

    #     permissions_user = self.get_approved_permissions(db=db, who=who, type_permission=type_permission)
    #     remunerated_permissions = await self.get_remunerated_permissions(engine=engine, permissions_user=permissions_user)

    #     #self.policy.create(self=PermissionCreate, who=who.id, to=obj_in, remunerated_permissions=remunerated_permissions)

    #     return await remunerated_permissions

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
            permissions_user = db.query(Application.mongo_id).join(
                Application_status, Application.id == Application_status.application_id).\
                filter(Application_status.status_id == 1).\
                filter(Application.application_sub_type_id == 7).\
                filter(Application.user_id == who.id).all()

            ids_mongo = [ObjectId(obj[0]) for obj in permissions_user]

            log.debug('ids_mongo ObjectId', ids_mongo)

        return ids_mongo

    async def get_remunerated_permissions(
        self,
        db: Session,
        engine: AIOSession,
        who: User,
        type_permission: int = 0
    ) -> int:

        #remunerated_permissions = 0
        permissions_user = self.get_approved_permissions(
            db=db, who=who, type_permission=type_permission)

        if len(permissions_user) > 0:

            today = datetime.now()

            log.debug('month: ', today, today.month, today.year)

            if today.month < 7:
                begin_semester = dateutil.parser.isoparse(
                    f'{today.year}-01-01T00:00:00.000Z')
                end_semester = dateutil.parser.isoparse(
                    f'{today.year}-06-30T00:00:00.000Z')
            else:
                begin_semester = dateutil.parser.isoparse(
                    f'{today.year}-07-01T00:00:00.000Z')
                end_semester = dateutil.parser.isoparse(
                    f'{today.year}-12-31T00:00:00.000Z')

            log.debug('begin and end semester ', begin_semester, end_semester)

            where = {
                "_id": {"$in": permissions_user},
                "start_date": {"$gt": begin_semester, "$lt": end_semester},
            }

            # Busca en MongoDB todos los permisos que empiezan en el semestre elegido
            remunerated_permissions = await engine.count(self.model, where)
            log.debug('remunerated_permissions: ', remunerated_permissions)

        return remunerated_permissions

    # async def get_multi_paid_permissions(
    #     self,
    #     engine: AIOSession,
    #     db: Session,
    #     who: User,
    #     type: int = 0
    # ) -> int:

    #     permissions_user = 0

    #     log.debug('ApplicationSubType.name: ', self.model)

    #     # 7: Permiso remunerado
    #     if type == 7:

    #         today = datetime.now()

    #         log.debug('month: ', today, today.month, today.year)

    #         if today.month < 7:
    #             begin_semester = datetime.strptime(
    #                 f'{today.year}-01-01', '%Y-%m-%d')
    #             end_semester = datetime.strptime(
    #                 f'{today.year}-06-30', '%Y-%m-%d')
    #         else:
    #             begin_semester = datetime.strptime(
    #                 f'{today.year}-07-01', '%Y-%m-%d')
    #             end_semester = datetime.strptime(
    #                 f'{today.year}-12-31', '%Y-%m-%d')

    #         log.debug('begin and end semester ', begin_semester, end_semester)

    #         where = {
    #             "start_date": {"$gt": begin_semester, "$lt": end_semester},
    #         }

    #         # Busca en MongoDB todos los permisos que empiezan en el semestre elegido
    #         permissions_semester = await engine.find(self.model, where)
    #         log.debug('permissions_semester: ', permissions_semester)

    #         if len(permissions_semester) > 0:
    #             ids_mongo = [str(obj.id) for obj in permissions_semester]
    #             log.debug('ids_mongo', ids_mongo)

    #             # Application_status.status_id == 3 es APROBADO
    #             permissions_user = db.query(Application).join(
    #                 Application_status, Application.id == Application_status.application_id).\
    #                 filter(Application_status.status_id == 3).\
    #                 filter(Application.application_sub_type_id == 7).\
    #                 filter(Application.mongo_id.in_(ids_mongo)).\
    #                 filter(Application.user_id == who.id).count()

    #             log.debug('permissions_user', permissions_user)

    #     return permissions_user


permission = CRUDPermission(Permission, ApplicationPolicy)

# policy = ApplicationPolicy()

# application_status = CRUDPermission(ApplicationPolicy, policy=policy)
