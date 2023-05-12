from typing import List

from app.domain import schemas

init_application_type: List[schemas.ApplicationTypeCreate] = [
    schemas.ApplicationTypeCreate(
        name="PERMISO",
        description="permiso",
        status_flux=[
            schemas.application_type.StatusFlux(
                status="SOLICITADA", scope=[0]),
            schemas.application_type.StatusFlux(
                status="VISTO BUENO", scope=[6, 7]),
            schemas.application_type.StatusFlux(status='APROBADA', scope=[5])
        ],
        who_can=[9, 11]
    ),
    schemas.ApplicationTypeCreate(
        name="COMISIÓN",
        description="comision",
        status_flux=[
            schemas.application_type.StatusFlux(
                status="SOLICITADA", scope=[0]),
            schemas.application_type.StatusFlux(
                status='VISTO BUENO', scope=[6, 7]),
            schemas.application_type.StatusFlux(status='APROBADA', scope=[5])
        ],
        who_can=[9, 11]
    ),
    schemas.ApplicationTypeCreate(
        name="DEDICACIÓN EXCLUSIVA",
        description="dedicacion",
        status_flux=[
            schemas.application_type.StatusFlux(
                status="SOLICITADA", scope=[0]),
            schemas.application_type.StatusFlux(status='APROBADA', scope=[5])
        ],
        who_can=[9]
    ),
    schemas.ApplicationTypeCreate(
        name="AVAL DE HORAS PARA GRUPOS DE INVESTIGACIÓN",
        description="avalhoras",
        status_flux=[
            schemas.application_type.StatusFlux(
                status="SOLICITADA", scope=[0]),
            schemas.application_type.StatusFlux(
                status="VISTO BUENO", scope=[6, 7]),
            schemas.application_type.StatusFlux(status='APROBADA', scope=[5])
        ],
        who_can=[9]
    ),
    schemas.ApplicationTypeCreate(
        name="VACACIONES",
        description="vacaciones",
        status_flux=[
            schemas.application_type.StatusFlux(
                status="SOLICITADA", scope=[0]),
            schemas.application_type.StatusFlux(
                status="VISTO BUENO", scope=[6, 7]),
            schemas.application_type.StatusFlux(
                status='APROBADA', scope=[5])
        ],
        who_can=[9, 11]
    ),
    schemas.ApplicationTypeCreate(
        name="APOYO ECONÓMICO PARA ESTUDIANTES",
        description="apoyo economico",
        status_flux=[
            schemas.application_type.StatusFlux(
                status="SOLICITADA", scope=[0]),
            schemas.application_type.StatusFlux(
                status="VISTO BUENO", scope=[5, 6, 7]),
            schemas.application_type.StatusFlux(
                status='APROBADA', scope=[5])
        ],
        who_can=[13]
    )
]

init_application_sub_type: List[schemas.ApplicationSubTypeCreate] = [
    #PERMISSION
    schemas.ApplicationSubTypeCreate(
        name="Licencia de maternidad",
        application_type_id=1,
        extra={"days": 126}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Licencia de paternidad",
        application_type_id=1,
        extra={"days": 8}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Cumpleaños",
        application_type_id=1,
        extra={"days": 1}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Luto",
        application_type_id=1,
        extra={"days": 5}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Calamidad doméstica",
        application_type_id=1,
        extra={"days": 12}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Licencia no remunerada",
        application_type_id=1,
        extra={"days": 60}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Licencia remunerada",
        application_type_id=1,
        extra={"days": 3}
    ),
    #COMMISSION
    schemas.ApplicationSubTypeCreate(
        name="Comisión de servicios",
        application_type_id=2
    ),
    schemas.ApplicationSubTypeCreate(
        name="Comisión de estudios",
        application_type_id=2
    ),
    #FULL TIME
    schemas.ApplicationSubTypeCreate(
        name="Dedicación",
        application_type_id=3
    ),
    #HOURS AVAL
    schemas.ApplicationSubTypeCreate(
        name="Aval de horas",
        application_type_id=4
    ),
    #VACATION
    schemas.ApplicationSubTypeCreate(
        name="Dias hábiles",
        application_type_id=5
    ),
    schemas.ApplicationSubTypeCreate(
        name="Dias calendario",
        application_type_id=5
    ),
    #ECONOMIC SUPPORT 
    schemas.ApplicationSubTypeCreate(
        name="Apoyo económico para estudiantes",
        application_type_id=6
    )
]
