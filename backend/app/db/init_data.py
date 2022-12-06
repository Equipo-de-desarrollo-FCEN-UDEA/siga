from typing import List

from app.domain import schemas
from app.core.config import get_app_settings

settings = get_app_settings()

init_users: List[schemas.UserCreate] = [
    schemas.UserCreate(
        last_names=settings.first_superemployee_last_names,
        names=settings.first_superemployee_names,
        identification_number=settings.first_superemployee_identification_number,
        scale=settings.first_superemployee_vinculation_type,
        vinculation_type=settings.first_superemployee_vinculation_type,
        department_id=settings.first_superemployee_department_id,
        rol_id=settings.first_superemployee_rol_id,
        email=settings.first_superemployee_email,
        active=True,
        password=settings.first_superemployee_password
    ),
    #FCEN
    schemas.UserCreate(
        last_names='FCEN',
        names='DECANO DE',
        identification_number='DECANOFCEN',
        scale='Decanatura',
        vinculation_type='Tiempo completo',
        department_id=3,
        rol_id=3,
        email='decaexactas@udea.edu.co',
        active= True,
        password= settings.decano_fcen_password
    ),
    schemas.UserCreate(
        last_names='FCEN',
        names='SECRETARIA DECANO DE',
        identification_number='DECANOFCEN',
        scale='Decanatura',
        vinculation_type='Tiempo completo',
        department_id=3,
        rol_id=4,
        email='decaexactas@udea.edu.co',
        active= True,
        password= settings.secretaria_decano_fcen_password
    ),
    #FISICA
    schemas.UserCreate(
        last_names='FÍSICA',
        names='DIRECTOR DE',
        identification_number='DIRECTORFISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=5,
        email='institutofisica@udea.edu.co',
        active= True,
        password= settings.director_fisica_password
    ),
    schemas.UserCreate(
        last_names='DIRECCIÓN FÍSICA',
        names='SECRETARIA DE',
        identification_number='SECRETARIAFISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=6,
        email='institutofisica@udea.edu.co',
        active= True,
        password= settings.secretaria_director_fisica_password
    ),

    schemas.UserCreate(
        last_names='FÍSICA',
        names='COORDINADOR POSGRADO DE ',
        identification_number='COORDINADORPOSGRADOFISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=7,
        email='posgradosfisica@udea.edu.co',
        active= True,
        password= settings.coordinador_posgrado_fisica_password
    ),
    schemas.UserCreate(
        last_names='FÍSICA',
        names='SECRETARIA POSGRADO DE ',
        identification_number='SECRETARIAPOSGRADOFISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=8,
        email='posgradosfisica@udea.edu.co',
        active= True,
        password= settings.secretaria_coordinador_posgrado_fisica_password
    ),
    schemas.UserCreate(
        last_names='FÍSICA',
        names='COORDINADOR PREGRADO DE ',
        identification_number='FISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=7,
        email='pregradofisica@udea.edu.co',
        active= True,
        password= settings.coordinador_pregrado_fisica_password
    ),
    schemas.UserCreate(
        last_names='FING',
        names='DECANO DE',
        identification_number='DECANOFING',
        scale='Decanatura',
        vinculation_type='Tiempo completo',
        department_id=3,
        rol_id=3,
        email='fcen@udea.edu.co',
        active= True,
        password= settings.decano_fing_password
    ),
    schemas.UserCreate(
        last_names='GARCÍA LUJÁN',
        names='SIMÓN',
        identification_number='1001987844',
        scale='Estudiante',
        vinculation_type='NO APLICA',
        department_id=3,
        rol_id=11,
        email='simon.garcial@udea.edu.co',
        active=False,
        password='123'
    ),
    schemas.UserCreate(
        last_names='MUÑOS ACEVEDO',
        names='JUAN CARLOS',
        identification_number='987654321',
        scale='VINCULADO',
        vinculation_type='TIEMPO COMPLETO',
        department_id=3,
        rol_id=9,
        email='muñoz.fake@udea.edu.co',
        active=True,
        password='123'
    ),
    schemas.UserCreate(
        last_names='MUÑOS ACEVEDO',
        names='JUAN CARLOSDOS',
        identification_number='9876543211',
        scale='VINCULADO',
        vinculation_type='TIEMPO COMPLETO',
        department_id=4,
        rol_id=9,
        email='muñoz.fakedos@udea.edu.co',
        active=True,
        password='123'
    ),
    schemas.UserCreate(
        last_names='QUIMICA',
        names='PROFESOR',
        identification_number='1239845651',
        scale='VINCULADO',
        vinculation_type='TIEMPO COMPLETO',
        department_id=5,
        rol_id=9,
        email='profesor.quimica@udea.edu.co',
        active=True,
        password='123'
    ),
    schemas.UserCreate(
        last_names='COORDINADOR',
        names='QUIMICA',
        identification_number='COORDQUIMICA',
        scale='VINCULADO',
        vinculation_type='TIEMPO COMPLETO',
        department_id=5,
        rol_id=7,
        email='coordquimica@udea.edu.co',
        active=True,
        password='123'
    ),
    schemas.UserCreate(
        last_names='COORDINADOR',
        names='FISICA',
        identification_number='COORDFISICA',
        scale='VINCULADO',
        vinculation_type='TIEMPO COMPLETO',
        department_id=3,
        rol_id=7,
        email='coordfisica@udea.edu.co',
        active=True,
        password='123'
    ),
    schemas.UserCreate(
        last_names='EMPLEADO',
        names='FISICA',
        identification_number='EMPLEADOFISICA',
        scale='VINCULADO',
        vinculation_type='TIEMPO COMPLETO',
        department_id=3,
        rol_id=10,
        email='empleado.fisica@udea.edu.co',
        active=True,
        password='123'
    ),
    schemas.UserCreate(
        last_names='COORDINADOR',
        names='SISTEMAS',
        identification_number='COORDSISTEMAS',
        scale='VINCULADO',
        vinculation_type='TIEMPO COMPLETO',
        department_id=4,
        rol_id=7,
        email='coordsistemas@udea.edu.co',
        active=True,
        password='123'
    ),
    schemas.UserCreate(
        last_names='DECANO',
        names='FING',
        identification_number='DECANOFING',
        scale='VINCULADO',
        vinculation_type='TIEMPO COMPLETO',
        department_id=4,
        rol_id=3,
        email='decanofing@udea.edu.co',
        active=True,
        password='123'
    ),
]

init_schools: List[schemas.SchoolCreate] = [
    schemas.SchoolCreate(
        name='ADMIN',
        description='ADMIN',
        cost_center=0,
        email_dean='simongarcia3640@gmail.com',
        contact='cel 3176840272',
        direction='cra 12#345-67',
        dean='Simon Garcia'
    ),
    schemas.SchoolCreate(
        name='FCEN',
        description='Facultad de ciencias exactas y naturales',
        cost_center=21402601,
        email_dean='fcen@udea.edu.co',
        direction='Ciudad Universitaria: Calle 67 N. o 53-108. Bloque 1, oficina 115 Recepción de correspondencia: Calle 70 N.o 52-21',
        contact='Teléfonos: 219 56 00 NIT: 890.980.040-8 Apartado: 1226',
        dean='Adriana Echavarria'
    ),
    schemas.SchoolCreate(
        name='FING',
        description='Facultad de ingeniería',
        cost_center=21301601,
        email_dean='fing@udea.edu.co',
        direction='Calle 67 No. 53 108 Bloques 18, 19, 20 y 21, Medellín, Antioquia',
        contact='Teléfonos: 2198130',
        dean='decano ingeniería'
    )
]


init_departments: List[schemas.DepartmentCreate] = [
    schemas.DepartmentCreate(
        name='ADMIN',
        description='Administradores',
        coord_email='simongarcia3640@gmail.com',
        school_id=1
    ),
    schemas.DepartmentCreate(
        name='SISTEMAS',
        description='Departamento de ingeniería de sistemas',
        coord_email='coordsistemas@udea.edu.co',
        school_id=3,
        cost_center=21301209
    ),

    schemas.DepartmentCreate(
        name='DECANATURA',
        description='Departamento decanatura',
        coord_email='fcen@udea.edu.co',
        school_id=2
    ),
    schemas.DepartmentCreate(
        name='FISICA',
        description='Instituto de Física',
        coord_email='coordfisica@udea.edu.co',
        school_id=2,
        cost_center=21401202
    ),
    
    schemas.DepartmentCreate(
        name='QUÍMICA',
        description='Instituto de química',
        coord_email="coordquimica@udea.edu.co",
        cost_center=21401204,
        school_id=2
    )
]


init_rols: List[schemas.DepartmentCreate] = [
    schemas.RolCreate(
        name='Admin',
        description='Administrador',
        scope=1
    ),
    schemas.RolCreate(
        name='Vicerrectoría',
        description='Vicerrectoría de docencia',
        scope=3
    ),
    schemas.RolCreate(
        name='Decano',
        description='Decano de la facultad',
        scope=5
    ),
    schemas.RolCreate(
        name='Secretaria',
        description='Secretaria decanatura',
        scope=5
    ),
    schemas.RolCreate(
        name='Director',
        description='Director del instituto',
        scope=6
    ),
    schemas.RolCreate(
        name='Secretaria',
        description='Secretaria dirección',
        scope=6
    ),
    schemas.RolCreate(
        name='Coordinador',
        description='Coordinador del instituto',
        scope=7
    ),
    schemas.RolCreate(
        name='Secretaria',
        description='Secreataria coordinación',
        scope=7
    ),
    schemas.RolCreate(
        name='Profesor',
        description='Usuario profesor',
        scope=9
    ),
    schemas.RolCreate(
        name='Empleado',
        description='Usuario empleado',
        scope=11
    ),
    schemas.RolCreate(
        name='Estudiante',
        description='Estudiante',
        scope=13
    )
]


init_statuss: List[schemas.StatusCreate] = [
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
        name='RECHAZADA'
    ),
    schemas.StatusCreate(
        name='FINALIZADA'
    ),
    schemas.StatusCreate(
        name='EN CREACIÓN'
    ),
    schemas.StatusCreate(
        name='EN CURSO'
    )
]

init_application_type: List[schemas.ApplicationTypeCreate] = [
    schemas.ApplicationTypeCreate(
        name="PERMISO",
        description="permiso",
        status_flux=[
            schemas.application_type.StatusFlux(status="SOLICITADA", scope=[0]),
            schemas.application_type.StatusFlux(status="VISTO BUENO", scope=[6, 7]),
            schemas.application_type.StatusFlux(status='APROBADA', scope=[5])
        ]
    ),
    schemas.ApplicationTypeCreate(
        name="COMISIÓN",
        description="comision",
        status_flux=[
            schemas.application_type.StatusFlux(status="SOLICITADA", scope=[0]),
            schemas.application_type.StatusFlux(status='VISTO BUENO', scope=[6, 7]),
            schemas.application_type.StatusFlux(status='APROBADA', scope=[5])
        ]
    ),
    # schemas.ApplicationTypeCreate(
    #     name="DEDICACIÓN EXCLUSIVA",
    #     description="dedicacion",
    #     status_flux=[
    #         schemas.application_type.StatusFlux(status="SOLICITADA", scope=[0]),
    #         schemas.application_type.StatusFlux(status='APROBADA', scope=[5])
    #     ]
    # )
]

init_application_sub_type: List[schemas.ApplicationSubTypeCreate] = [
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
    schemas.ApplicationSubTypeCreate(
        name="Comisión de servicios",
        application_type_id=2
    ),
    schemas.ApplicationSubTypeCreate(
        name="Comisión de estudios",
        application_type_id=2
    ),
    # schemas.ApplicationSubTypeCreate(
    #     name="Dedicación",
    #     application_type_id=3
    # )
]