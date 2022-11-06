from app.services.crud import application
from app.domain.schemas import ApplicationCreate
from app.domain.models import User, Rol
from app.core.config import get_app_settings
from app.core.logging import get_logging
from tests.db.base import TestBaseDB

settings = get_app_settings()

log = get_logging(__name__)


class TestApplicationCrud(TestBaseDB):

    def test_user_service(self):
        admin: User = self.session.query(
            User).join(Rol).filter(Rol.scope == 1).first()
        professor: User = self.session.query(
            User).join(Rol).filter(Rol.scope == 9).first()
        student: User = self.session.query(
            User).join(Rol).filter(Rol.scope == 13).first()
        coord: User = (self
                       .session
                       .query(User)
                       .join(Rol)
                       .filter(Rol.scope == 7)
                       .filter(User.department_id != professor.department_id)
                       .first())

        application_permission = ApplicationCreate(
            mongo_id=1,
            application_sub_type_id=3,
            user_id=professor.id
        )

        application_created = application.create(db=self.session, who=professor,
                                                 obj_in=application_permission)

        applications_professor = application.get_multi(
            db=self.session, who=professor)

        applications_student = application.get_multi(
            db=self.session, who=student)

        applications_admin = application.get_multi(
            db=self.session, who=admin)

        applications_coord = application.get_multi(db=self.session, who=coord)

        assert application_created.application_status[0].status_id == 1
        assert len(applications_professor) == 1
        assert len(applications_student) == 0
        assert len(applications_admin) > 0
        assert len(applications_coord) == 0