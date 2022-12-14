from pytest import raises

from app.domain.models import User, Application, Rol, Application_status
from app.domain.schemas import ApplicationCreate, Application_statusCreate
from app.domain.policies.application import ApplicationPolicy
from app.domain.errors.base import BaseErrors
from app.core.logging import get_logging
from tests.db.base import TestBaseDB

log = get_logging(__name__)


class TestApplicationPolicy(TestBaseDB):
    def test_application_policy(self):
        admin: User = self.session.query(
            User).join(Rol).filter(Rol.scope == 1).first()
        student: User = self.session.query(
            User).join(Rol).filter(Rol.scope == 13).first()
        employee: User = self.session.query(
            User).join(Rol).filter(Rol.scope == 11).first()
        professor: User = self.session.query(
            User).join(Rol).filter(Rol.scope == 9).first()

        # application type permission, cant be schedule by student
        application_permission = ApplicationCreate(
            mongo_id=1,
            application_sub_type_id=3,
            user_id=student.id
        )

        # application type commission, cant be schedule by student
        application_commission = ApplicationCreate(
            mongo_id=2,
            application_sub_type_id=8,
            user_id=professor.id
        )

        # application type full_time, cant be schedule by student or employee
        application_full_time = ApplicationCreate(
            mongo_id=2,
            application_sub_type_id=10,
            user_id=professor.id
        )
        application_permission_professor = ApplicationCreate(
            mongo_id=1,
            application_sub_type_id=3,
            user_id=professor.id
        )

        # We make an permission application for test the delete policy
        permission = Application(**dict(application_permission_professor))
        self.session.add(permission)
        self.session.commit()
        self.session.refresh(permission)
        
        # We make a status type VISTO BUENO for the permission application
        visto_bueno_status = Application_status(**dict(Application_statusCreate(
            application_id=permission.id, status_id=2, observation="Visto bueno")))
        self.session.add(visto_bueno_status)
        self.session.commit()
        self.session.refresh(visto_bueno_status)

        log.debug(permission.application_status[-1].status.name)


        policy = ApplicationPolicy()

        with raises(BaseErrors):
            policy.create(who=student, to=application_permission)

        with raises(BaseErrors):
            policy.create(who=student, to=application_commission)

        with raises(BaseErrors):
            policy.create(who=student, to=application_full_time)

        with raises(BaseErrors):
            policy.create(who=employee, to=application_full_time)

        with raises(BaseErrors):
            policy.delete(who=professor, to=permission)

        with raises(BaseErrors):
            policy.delete(who=employee, to=permission)
        
        with raises(BaseErrors):
            policy.update(who=professor, to=permission, obj_in={"update schema": True})

        with raises(BaseErrors):
            policy.update(who=employee, to=permission, obj_in={"update schema": True})