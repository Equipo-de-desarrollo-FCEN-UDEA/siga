from pytest import raises

from app.domain.models import User, Application, Rol
from app.domain.schemas import ApplicationCreate
from app.domain.policies.application import ApplicationPolicy
from app.domain.errors.base import BaseErrors
from app.core.logging import get_logging
from tests.db.base import TestBaseDB

log = get_logging(__name__)


class TestApplicationPolicy(TestBaseDB):
    def test_user_policy(self):
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

        # application type dedication, cant be schedule by student or employee
        application_dedication = ApplicationCreate(
            mongo_id=2,
            application_sub_type_id=10,
            user_id=professor.id
        )

        policy = ApplicationPolicy()

        with raises(BaseErrors):
            policy.create(who=student, to=application_permission)

        with raises(BaseErrors):
            policy.create(who=student, to=application_commission)

        with raises(BaseErrors):
            policy.create(who=student, to=application_dedication)

        with raises(BaseErrors):
            policy.create(who=employee, to=application_dedication)
