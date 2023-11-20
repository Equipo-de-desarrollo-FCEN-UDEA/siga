from backend.app.domain.models.userrol import UserRol
from pytest import raises

from app.domain.models import User, Application, Rol, Application_status, Department
from app.domain.schemas import ApplicationCreate, Application_statusCreate
from app.domain.policies.application_status import Application_statusPolicy
from app.domain.errors.base import BaseErrors
from app.core.logging import get_logging
from tests.db.base import TestBaseDB

log = get_logging(__name__)


class TestApplication_statusPolicy(TestBaseDB):
    def test_application_status_policy(self):
        professor: User = self.session.query(
            User).join(UserRol, UserRol.user_id == User.id).join(Rol, Rol.id == UserRol.rol_id)  # Unir UserRol con Rolfilter(Rol.scope == 9).first()
        dean: User = (self.session.query(User)
                      .join(UserRol, UserRol.user_id == User.id)  # Unir User con UserRol
                      .join(Rol, Rol.id == UserRol.rol_id)  # Unir UserRol con Rol
                      .join(Department)
                      .filter(Rol.scope == 5, Department.school_id == professor.department.school_id)
                      .first())
        coord: User = (self.session.query(User)
                       .join(UserRol, UserRol.user_id == User.id)  # Unir User con UserRol
                       .join(Rol, Rol.id == UserRol.rol_id)  # Unir UserRol con Rol
                       .join(Department)
                       .filter(Rol.scope == 7, Department.school_id == professor.department.school_id)
                       .first())

        # application type permission, cant be schedule by student
        application_permission = ApplicationCreate(
            mongo_id=1,
            application_sub_type_id=3,
            user_id=professor.id
        )

        # We make an permission application for test the delete policy
        permission = Application(**dict(application_permission))
        self.session.add(permission)
        self.session.commit()
        self.session.refresh(permission)

        # We add application status Solicitada
        self.session.add(Application_status(
            **{"observation": "Observation", "application_id": permission.id, "status_id": 1}))
        self.session.commit()

        policy = Application_statusPolicy()

        # This will raise and break test if coord cant apply status
        status = policy.create(coord, to=permission)

        assert status == 'VISTO BUENO'

        with raises(BaseErrors):
            # dean cant aprobe without permission be in VISTO BUENO or DEVUELTA status
            policy.create(dean, to=permission)
