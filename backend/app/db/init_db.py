from datetime import datetime

from sqlalchemy.orm import Session

from app.domain import schemas
from app.services import crud
from app.core.config import get_app_settings
from app.core.logging import get_logging
from app.db import session, base

log = get_logging(__name__)

settings = get_app_settings()


# Aquí inicializamos la base de datos
def init_db(db: Session) -> None:
    log.info('Conectándose a la base de datos')

    # Creamos las datos en caso de que no estén creadas
    base.Base.metadata.create_all(bind=session.engine)

    log.info('Conexión establecida')

    # areas = crud.area.get_init(db=db, id=1)

    # if not areas:
    #     log.info('Generando datos iniciales de areas')
    #     for area in settings.areas:
    #         area_in = schemas.AreaCreate(
    #             nombre=area
    #         )
    #         area_out = crud.area.create_init(db=db, obj_in=area_in)
    #     log.info('Datos iniciales tablas inicializados')

    # Creamos el admin en caso de que no esté creado aún
    employee = crud.user.get_init(db=db, id=1)
    if not employee:
        log.info('Creando primer super user')
        employee_in = schemas.UserCreate(
            primerApellido=settings.first_superemployee_primerapellido,
            segundoApellido=settings.first_superemployee_segundoapellido,
            primerNombre=settings.first_superemployee_primernombre,
            otrosNombres=settings.first_superemployee_otrosnombres,
            pais=settings.first_superemployee_pais,
            numeroIdentificacion=settings.first_superemployee_numeroidentificacion,
            fechaIngreso=datetime.today(),
            is_superuser=True,
            password=settings.first_superemployee_password,
        )
        # area_id=settings.first_superemployee_area_id,
        log.debug(employee_in.fechaIngreso)
        employee = crud.user.create_init(db, obj_in=employee_in)
        log.info('Primer super user creado')
