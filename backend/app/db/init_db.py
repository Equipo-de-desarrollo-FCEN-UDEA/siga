from app.services.security.jwt import get_password_hash

from sqlalchemy import event

from app.core.config import get_app_settings
from app.core.logging import get_logging
from app.db import session, base


log = get_logging(__name__)

settings = get_app_settings()


# Aquí inicializamos la base de datos
def init_db() -> None:

    @event.listens_for(base.Base.metadata, 'after_create')
    def receive_after_create(target, connection, tables, **kw):
        for table in tables:
            log.info('La tabla ' + table.name + ' fue creada')

    @event.listens_for(base.Department.__table__, 'after_create')
    def init_department(table, conn, *args, **kwargs):
        from .init_data.departments import init_departments
        for department in init_departments:
            db_obj = dict(department)
            conn.execute(table.insert().values(**db_obj))
        log.info(f'Tabla departamentos inicializados')

    @event.listens_for(base.User.__table__, 'after_create')
    def init_user(table, conn, *args, **kwargs):
        from .init_data.users import init_users
        for user in init_users:
            db_obj = dict(user)
            db_obj['hashed_password'] = get_password_hash(
                db_obj['password'])
            del db_obj['password']
            conn.execute(table.insert().values(**db_obj))
        log.info(f'Usuarios iniciales creados')

    @event.listens_for(base.School.__table__, 'after_create')
    def init_school(table, conn, *args, **kwargs):
        from .init_data.schools import init_schools
        for school in init_schools:
            db_obj = dict(school)
            conn.execute(table.insert().values(**db_obj))
        log.info(f'Facultades iniciales creadas')

    @event.listens_for(base.Rol.__table__, 'after_create')
    def init_rol(table, conn, *args, **kwargs):
        from .init_data.roles import init_rols
        for rol in init_rols:
            db_obj = dict(rol)
            conn.execute(table.insert().values(**db_obj))
        log.info('Roles iniciales creados')

    @event.listens_for(base.Status.__table__, 'after_create')
    def init_status(table, conn, *args, **kwargs):
        from .init_data.status import init_status
        for status in init_status:
            db_obj = dict(status)
            conn.execute(table.insert().values(**db_obj))
        log.info('Estados iniciales de las solicitudes creados')
    
    @event.listens_for(base.ApplicationType.__table__, 'after_create')
    def init_application_type(table, conn, *args, **kwargs):
        from .init_data.applications import init_application_type
        for type in init_application_type:
            db_obj = dict(type.dict())
            conn.execute(table.insert().values(**db_obj))
        log.info('Tipos iniciales de las solicitudes creados')

    @event.listens_for(base.ApplicationSubType.__table__, 'after_create')
    def init_application_sub_type(table, conn, *args, **kwargs):
        from .init_data.applications import init_application_sub_type
        for subType in init_application_sub_type:
            db_obj = dict(subType)
            conn.execute(table.insert().values(**db_obj))
        log.info('subtipos iniciales de las solicitudes creados')



    base.Base.metadata.create_all(bind=session.engine)
