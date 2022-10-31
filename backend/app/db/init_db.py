from app.services.security.jwt import get_password_hash

from sqlalchemy.orm import Session
from sqlalchemy import event

from app.domain import schemas
from app.core.config import get_app_settings
from app.core.logging import get_logging
from app.db import session, base


log = get_logging(__name__)

settings = get_app_settings()


# Aquí inicializamos la base de datos
def init_db(db: Session) -> None:

    @event.listens_for(base.Base.metadata, 'after_create')
    def receive_after_create(target, connection, tables, **kw):
        for table in tables:
            log.info('La tabla ' + table.name + ' fue creada')

    @event.listens_for(base.Department.__table__, 'after_create')
    def init_department(table, conn, *args, **kwargs):
        from .init_data import init_departments
        for department in init_departments:
            db_obj = dict(department)
            conn.execute(table.insert().values(**db_obj))
        log.info(f'Tabla departamentos inicializados')

    @event.listens_for(base.User.__table__, 'after_create')
    def init_user(table, conn, *args, **kwargs):
        from .init_data import init_users
        for user in init_users:
            db_obj = dict(user)
            db_obj['hashed_password'] = get_password_hash(
                db_obj['password'])
            del db_obj['password']
            conn.execute(table.insert().values(**db_obj))
        log.info(f'Usuarios iniciales creados')

    @event.listens_for(base.School.__table__, 'after_create')
    def init_school(table, conn, *args, **kwargs):
        from .init_data import init_schools
        for school in init_schools:
            db_obj = dict(school)
            conn.execute(table.insert().values(**db_obj))
        log.info(f'Facultades iniciales creadas')

    @event.listens_for(base.Rol.__table__, 'after_create')
    def init_rol(table, conn, *args, **kwargs):
        from .init_data import init_rols
        for rol in init_rols:
            db_obj = dict(rol)
            conn.execute(table.insert().values(**db_obj))
        log.info('Roles iniciales creados')

    base.Base.metadata.create_all(bind=session.engine)
