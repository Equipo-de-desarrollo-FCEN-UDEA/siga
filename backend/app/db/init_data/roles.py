from typing import List

from app.domain import schemas


init_rols: List[schemas.RolCreate] = [
    # 1
    schemas.RolCreate(
        name='Admin',
        description='Administrador',
        scope=1
    ),
    # 2
    schemas.RolCreate(
        name='Vicerrectoría',
        description='Vicerrectoría de docencia',
        scope=3
    ),
    # 3
    schemas.RolCreate(
        name='Decano',
        description='Decano de la facultad',
        scope=5
    ),
    # 4
    schemas.RolCreate(
        name='Secretaria',
        description='Secretaria decanatura',
        scope=5
    ),
    # 5
    schemas.RolCreate(
        name='Director',
        description='Director del instituto',
        scope=6
    ),
    # 6
    schemas.RolCreate(
        name='Secretaria',
        description='Secretaria dirección',
        scope=6
    ),
    # 7
    schemas.RolCreate(
        name='Coordinador',
        description='Coordinador del instituto',
        scope=7
    ),
    # 8
    schemas.RolCreate(
        name='Secretaria',
        description='Secreataria coordinación',
        scope=7
    ),
    # 9
    schemas.RolCreate(
        name='Profesor',
        description='Usuario profesor',
        scope=9
    ),
    # 10
    schemas.RolCreate(
        name='Empleado',
        description='Usuario empleado',
        scope=11
    ),


    # 11
    schemas.RolCreate(
        name='Estudiante pregrado',
        description='Estudiante pregrado',
        scope=27
    ),

    # 12
    schemas.RolCreate(
        name='Estudiante posgrado',
        description='Estudiante posgrado',
        scope=28
    )
]