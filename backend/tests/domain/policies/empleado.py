from datetime import datetime
from email import policy

from pytest import raises
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.domain.models import Usuario
from app.domain.models.base import Base
from app.domain.policies.usuario import UsuarioPolicy
from app.domain.schemas.errors.base import BaseErrors
from app.domain.schemas import UsuarioUpdate
from app.core.logging import get_logging

log = get_logging(__name__)


class TestPolicyUsuario:
    engine = create_engine('sqlite:///:memory:')
    Session = sessionmaker(bind=engine)
    # Base = declarative_base()
    session = Session()
    usuario1 = {
        "primerApellido": "GARCIA",
        "segundoApellido": "LUJAN",
        "primerNombre": "SIMON",
        "pais": "COLOMBIA",
        "numeroIdentificacion": "CC-1001987844",
        "fechaIngreso": datetime.now(),
        "area_id": 2,
        "correo": "simon@example.com",
        "hashed_password": "Super secretpassword",
        "is_superuser": True
    }
    usuario2 = {
        "primerApellido": "GARCIA",
        "segundoApellido": "LUJAN",
        "primerNombre": "SIMON",
        "pais": "COLOMBIA",
        "numeroIdentificacion": "CC-1001987844-1",
        "fechaIngreso": datetime.now(),
        "area_id": 2,
        "correo": "simon1@example.com",
        "hashed_password": "Super secretpassword",
        "is_superuser": False
    }

    to = UsuarioUpdate(
        primerApellido="UPDATE",
        segundoApellido="UPDATE",
        primerNombre="UPDATE",
        pais="UPDATE",
        fechaIngreso=datetime.now(),
        area_id=3,
        activo=False,
        numeroIdentificacion="UPDATE"
    )

    def setup_method(self):
        log.debug("Setup")
        Base.metadata.create_all(self.engine)
        self.session.add(Usuario(**self.usuario1))
        self.session.add(Usuario(**self.usuario2))
        self.session.commit()

    def test_usuario_policy(self):
        result1: Usuario = self.session.query(
            Usuario).where(Usuario.id == 1).first()
        result2: Usuario = self.session.query(
            Usuario).where(Usuario.id == 2).first()
        policy = UsuarioPolicy()
        with raises(BaseErrors):
            policy.create(result2)
        with raises(BaseErrors):
            policy.get(who=result2, to=result1)
        with raises(BaseErrors):
            policy.get_multi(result2)
        with raises(BaseErrors):
            policy.update(who=result2, to=result1)
        with raises(BaseErrors):
            policy.update_password(
                who=result2, to=result2, password="123", confirmpassword="321")
        with raises(BaseErrors):
            policy.update_password(
                who=result2, to=result1, password="123", confirmpassword="123")
        with raises(BaseErrors):
            policy.update(who=result2, to=self.to)
        

    def teardown_method(self):
        log.debug("teardown")
        Base.metadata.drop_all(self.engine)
