from app.services.crud import user
from app.domain.schemas import UserCreate
from app.core.config import get_app_settings
from app.core.logging import get_logging
from app.services.security.jwt import check_password
from tests.db.base import TestBaseDB

settings = get_app_settings()

log = get_logging(__name__)


class TestUserCrud(TestBaseDB):

    def test_user_service(self):
        user_by_email = user.get_by_email(
            db=self.session, email=settings.first_superemployee_email)
        user_by_id = user.get_by_identificacion(
            db=self.session, identification=settings.first_superemployee_identification_number)
        multi_user = user.get_multi(db=self.session, who=user_by_email)

        user_create = UserCreate(
            last_names='FING',
            names='DECANO DE',
            identificaction_number='NO9APLICA',
            scale='Decanatura',
            vinculation_type='Tiempo completo',
            department_id=4,
            rol_id=3,
            email='fing@udea.edu.co',
            password='decanofing'
        )

        user_new_password = user.update_password(
            db=self.session, password='newpassword', confirmPassword='newpassword', db_obj=user_by_email, who=user_by_email)

        user_authenticate = user.authenticate(
            db=self.session, email=user_by_email.email, password='newpassword')

        user_created = user.create(db=self.session, obj_in=user_create)

        user_updated = user.update(
            db=self.session, who=user_by_email, db_obj=user_created, obj_in={"active": False, "name": 'pepito suarez'})

        assert user_by_email.email == settings.first_superemployee_email.upper()
        assert user_by_id.identificaction_number == settings.first_superemployee_identification_number.upper()
        assert len(multi_user) > 1
        assert user_created.email == 'fing@udea.edu.co'.upper()
        assert user_authenticate.email == user_by_email.email
        assert user_updated.active == False
        assert check_password('newpassword', user_new_password.hashed_password)