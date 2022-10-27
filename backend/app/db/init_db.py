from datetime import datetime
from urllib.parse import scheme_chars
from app.domain.models.department import Department
from app.services.security.jwt import get_password_hash

from sqlalchemy.orm import Session
from sqlalchemy import event
from sqlalchemy.pool import Pool

from app.domain import schemas
from app.services import crud
from app.core.config import get_app_settings
from app.core.logging import get_logging
from app.db import session, base

log = get_logging(__name__)

settings = get_app_settings()


# Aquí inicializamos la base de datos
def init_db(db: Session) -> None:

    @event.listens_for(base.Base.metadata, 'after_create')
    def receive_after_create(target, connection, tables, **kw):
        "listen for the 'after_create' event"
        for table in tables:
            log.info('La tabla ' + table.name + ' fue creada')

    @event.listens_for(base.Department.__table__, 'after_create')
    def init_department(table, conn, *args, **kwargs):
        db_obj = schemas.DepartmentCreate(name='ADMIN', description='Administradores',
                                          coordEmail='simongarcia3640@gmail.com', school_id=1)
        db_obj = dict(db_obj)
        conn.execute(table.insert().values(**db_obj))
        log.info('Tabla departamentos inicializados')

    @event.listens_for(base.User.__table__, 'after_create')
    def init_user(table, conn, *args, **kwargs):
        db_obj = schemas.UserCreate(
            lastNames=settings.first_superemployee_last_names,
            names=settings.first_superemployee_names,
            identificationNumber=settings.first_superemployee_identification_number,
            scale=settings.first_superemployee_vinculation_type,
            vinculationType=settings.first_superemployee_vinculation_type,
            department_id=settings.first_superemployee_department_id,
            rol_id=settings.first_superemployee_rol_id,
            email=settings.first_superemployee_email
        )

        db_obj = dict(db_obj)
        del db_obj['password']
        db_obj['hashed_password'] = get_password_hash(
            settings.first_superemployee_password),
        conn.execute(table.insert().values(**db_obj))
        log.info('Usuario admin creado')

    @event.listens_for(base.School.__table__, 'after_create')
    def init_schools(table, conn, *args, **kwargs):
        db_obj = schemas.SchoolCreate(
            name='admin', description='admin', costCenter=0, emailDean='simongarcia3640@gmail.com')
        
        db_obj = dict(db_obj)
        conn.execute(table.insert().values(**db_obj))
        log.info('Facultades iniciales')
    base.Base.metadata.create_all(bind=session.engine)
