from typing import List

from app.domain import schemas

init_status: List[schemas.StatusCreate] = [
    schemas.StatusCreate(
        name='SOLICITADA'
    ),
    schemas.StatusCreate(
        name='VISTO BUENO'
    ),
    schemas.StatusCreate(
        name='APROBADA'
    ),
    schemas.StatusCreate(
        name='DEVUELTA'
    ),
    schemas.StatusCreate(
        name='FINALIZADA'
    ),
    schemas.StatusCreate(
        name='EN CREACIÓN'
    ),
    schemas.StatusCreate(
        name='EN CURSO'
    ),
    schemas.StatusCreate(
        name='EN VICERRECTORÍA'
    )
]