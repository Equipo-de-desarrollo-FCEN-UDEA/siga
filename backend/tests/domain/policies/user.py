from pytest import raises

from app.domain.models import User, Rol
from app.domain.policies.user import UserPolicy
from app.domain.errors.base import BaseErrors
from app.core.logging import get_logging
from tests.db.base import TestBaseDB

log = get_logging(__name__)


class TestUserPolicy(TestBaseDB):
    def test_user_policy(self):
        admin: User = self.session.query(
            User).join(Rol).where(Rol.scope== 1).first()
        student: User = self.session.query(
            User).join(Rol).where(Rol.scope == 13).first()
        professor: User = self.session.query(
            User).join(Rol).where(Rol.scope == 9).first()

        log.debug(admin.__dict__)

        policy = UserPolicy()
        with raises(BaseErrors):
            policy.get(who=student, to=admin)
        with raises(BaseErrors):
            policy.get_multi(student)
        with raises(BaseErrors):
            policy.update_password(
                who=student, to=student, password="123", confirmpassword="321")
        with raises(BaseErrors):
            policy.update_password(
                who=student, to=admin, password="123", confirmpassword="123")
        with raises(BaseErrors):
            policy.update(who=student, obj_in={
                          "active": not student.active}, to=student)
        with raises(BaseErrors):
            policy.update(who=student, obj_in={"active": True}, to=admin)
        with raises(BaseErrors):
            policy.delete(who=student, to=admin)
        with raises(BaseErrors):
            policy.update(who=professor, obj_in={"Any": 'Any'}, to=student)
