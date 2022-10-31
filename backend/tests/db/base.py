from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db import base
from app.core.logging import get_logging

log = get_logging(__name__)


class TestBaseDB:
    engine = create_engine('sqlite:///:memory:')
    Session = sessionmaker(bind=engine)
    # Base = declarative_base()
    session = Session()
    
    def setup_method(self):
        log.debug("Setup")
        # base.Base.metadata.drop_all(self.engine)
        # @event.listens_for(base.Base.metadata, 'after_create')
        # def receive_after_create(target, connection, tables, **kw):
        #     for table in tables:
        #         log.info('La tabla ' + table.name + ' fue creada')

        # @event.listens_for(base.Department.__table__, 'after_create')
        # def init_department(table, conn, *args, **kwargs):
        #     from app.db.init_data import init_departments
        #     for department in init_departments:
        #         db_obj = dict(department)
        #         conn.execute(table.insert().values(**db_obj))
        #     log.info(f'Tabla departamentos inicializados')

        # @event.listens_for(base.User.__table__, 'after_create')
        # def init_user(table, conn, *args, **kwargs):
        #     from app.db.init_data import init_users
        #     for user in init_users:
        #         db_obj = dict(user)
        #         log.debug(conn.execute(table.select()).fetchall())
        #         db_obj['hashed_password'] = (
        #             db_obj['password'])
        #         del db_obj['password']
        #         conn.execute(table.insert().values(**db_obj))
        #     log.info(f'Usuarios iniciales creados')

        # @event.listens_for(base.School.__table__, 'after_create')
        # def init_school(table, conn, *args, **kwargs):
        #     from app.db.init_data import init_schools
        #     for school in init_schools:
        #         db_obj = dict(school)
        #         conn.execute(table.insert().values(**db_obj))
        #     log.info(f'Facultades iniciales creadas')

        # @event.listens_for(base.Rol.__table__, 'after_create')
        # def init_rol(table, conn, *args, **kwargs):
        #     from app.db.init_data import init_rols
        #     for rol in init_rols:
        #         db_obj = dict(rol)
        #         conn.execute(table.insert().values(**db_obj))
        #     log.info('Roles iniciales creados')

        base.Base.metadata.create_all(self.engine)
    
    def teardown_method(self):
        log.debug("teardown")
        base.Base.metadata.drop_all(self.engine)
