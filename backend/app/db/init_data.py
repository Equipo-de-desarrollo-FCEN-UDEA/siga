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
    # DECANATURA FCEN
    schemas.UserCreate(
        last_names='FCEN',
        names='DECANO DE',
        identification_number='DECANOFCEN',
        scale='Decanatura',
        vinculation_type='Tiempo completo',
        department_id=2,
        rol_id=3,
        email='decaexactas@udea.edu.co',
        active=True,
        password=settings.decano_fcen_password
    ),
    schemas.UserCreate(
        last_names='FCEN',
        names='SECRETARIA DECANO DE',
        identification_number='SECREDECANOFCEN',
        scale='Decanatura',
        vinculation_type='Tiempo completo',
        department_id=3,
        rol_id=4,
        email='apoyodecanatoexactas@udea.edu.co',
        active=True,
        password=settings.secretaria_decano_fcen_password
    ),
    # VICEDECANATURA FCEN
    schemas.UserCreate(
        last_names='FCEN',
        names='VICEDECANO DE',
        identification_number='VICEDECANOFCEN',
        scale='Decanatura',
        vinculation_type='Tiempo completo',
        department_id=3,
        rol_id=5,
        email='vicedecacen@udea.edu.co',
        active=True,
        password=settings.vicedecano_fcen_password
    ),
    schemas.UserCreate(
        last_names='FCEN',
        names='SECRETARIA VICEDECANO DE',
        identification_number='SECREVICEDECANOFCEN',
        scale='Decanatura',
        vinculation_type='Tiempo completo',
        department_id=3,
        rol_id=6,
        email='apoyovicedecaexactas@udea.edu.co',
        active=True,
        password=settings.secretaria_vicedecano_fcen_password
    ),

    # MATEMÁTICAS
    schemas.UserCreate(
        last_names='MATEMÁTICAS',
        names='DIRECTOR DE',
        identification_number='DIRECTORMATEMATICAS',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=5,
        email='institutomatematicas@udea.edu.co',
        active=True,
        password=settings.director_matematicas_password
    ),
    schemas.UserCreate(
        last_names='DIRECCIÓN MATEMÁTICAS',
        names='SECRETARIA DE',
        identification_number='SECREMATEMATICAS',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=6,
        email='apoyoinstitutomatematicas@udea.edu.co',
        active=True,
        password=settings.secretaria_director_matematicas_password
    ),

    schemas.UserCreate(
        last_names='MATEMÁTICAS',
        names='COORDINADOR POSGRADO DE ',
        identification_number='COORDPOSMATEMATICAS',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=7,
        email='posgradosmatematicas@udea.edu.co',
        active=True,
        password=settings.coordinador_posgrado_matematicas_password
    ),
    schemas.UserCreate(
        last_names='MATEMÁTICAS',
        names='SECRETARIA POSGRADO DE ',
        identification_number='SECREPOSMATEMATICAS',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=8,
        email='apoyoposgradosmatematicas@udea.edu.co',
        active=True,
        password=settings.secretaria_coordinador_posgrado_matematicas_password
    ),
    schemas.UserCreate(
        last_names='MATEMÁTICAS',
        names='COORDINADOR PREGRADO DE ',
        identification_number='COORDPREMATEMATICAS',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=4,
        rol_id=7,
        email='pregradomatematicas@udea.edu.co',
        active=True,
        password=settings.coordinador_pregrado_matematicas_password
    ),
    # FISICA
    schemas.UserCreate(
        last_names='FÍSICA',
        names='DIRECTOR DE',
        identification_number='DIRECTORFISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=5,
        rol_id=5,
        email='institutofisica@udea.edu.co',
        active=True,
        password=settings.director_fisica_password
    ),
    schemas.UserCreate(
        last_names='DIRECCIÓN FÍSICA',
        names='SECRETARIA DE',
        identification_number='SECREFISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=5,
        rol_id=6,
        email='apoyoinstitutofisica@udea.edu.co',
        active=True,
        password=settings.secretaria_director_fisica_password
    ),

    schemas.UserCreate(
        last_names='FÍSICA',
        names='COORDINADOR POSGRADO DE ',
        identification_number='COORDPOSFISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=5,
        rol_id=7,
        email='posgradosfisica@udea.edu.co',
        active=True,
        password=settings.coordinador_posgrado_fisica_password
    ),
    schemas.UserCreate(
        last_names='FÍSICA',
        names='SECRETARIA POSGRADO DE ',
        identification_number='SECREPOSFISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=5,
        rol_id=8,
        email='apoyoposgradosfisica@udea.edu.co',
        active=True,
        password=settings.secretaria_coordinador_posgrado_fisica_password
    ),
    schemas.UserCreate(
        last_names='FÍSICA',
        names='COORDINADOR PREGRADO DE ',
        identification_number='COORDPREFISICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=5,
        rol_id=7,
        email='pregradofisica@udea.edu.co',
        active=True,
        password=settings.coordinador_pregrado_fisica_password
    ),

    # BIOLOGÍA
    schemas.UserCreate(
        last_names='BIOLOGÍA',
        names='DIRECTOR DE',
        identification_number='DIRECTORBIOLOGIA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=6,
        rol_id=5,
        email='institutobiologia@udea.edu.co',
        active=True,
        password=settings.director_biologia_password
    ),
    schemas.UserCreate(
        last_names='DIRECCIÓN BIOLOGÍA',
        names='SECRETARIA DE',
        identification_number='SECREBIOLOGIA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=6,
        rol_id=6,
        email='apoyoinstitutobiologia@udea.edu.co',
        active=True,
        password=settings.secretaria_director_biologia_password
    ),

    schemas.UserCreate(
        last_names='BIOLOGÍA',
        names='COORDINADOR POSGRADO DE ',
        identification_number='COORDPOSBIOLOGIA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=6,
        rol_id=7,
        email='posgradosbiologia@udea.edu.co',
        active=True,
        password=settings.coordinador_posgrado_biologia_password
    ),
    schemas.UserCreate(
        last_names='BIOLOGÍA',
        names='SECRETARIA POSGRADO DE ',
        identification_number='SECREPOSBIOLOGIA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=6,
        rol_id=8,
        email='apoyoposgradosbiologia@udea.edu.co',
        active=True,
        password=settings.secretaria_coordinador_posgrado_biologia_password
    ),
    schemas.UserCreate(
        last_names='BIOLOGÍA',
        names='COORDINADOR PREGRADO DE ',
        identification_number='COORDPREBIOLOGIA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=6,
        rol_id=7,
        email='pregradobiologia@udea.edu.co',
        active=True,
        password=settings.coordinador_pregrado_biologia_password
    ),

    # QUÍMICA
    schemas.UserCreate(
        last_names='QUÍMICA',
        names='DIRECTOR DE',
        identification_number='DIRECTORQUIMICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=7,
        rol_id=5,
        email='institutoquimica@udea.edu.co',
        active=True,
        password=settings.director_quimica_password
    ),
    schemas.UserCreate(
        last_names='DIRECCIÓN QUÍMICA',
        names='SECRETARIA DE',
        identification_number='SECREQUIMICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=7,
        rol_id=6,
        email='apoyoinstitutoquimica@udea.edu.co',
        active=True,
        password=settings.secretaria_director_quimica_password
    ),

    schemas.UserCreate(
        last_names='QUÍMICA',
        names='COORDINADOR POSGRADO DE ',
        identification_number='COORDPOSQUIMICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=7,
        rol_id=7,
        email='posgradosquimica@udea.edu.co',
        active=True,
        password=settings.coordinador_posgrado_quimica_password
    ),
    schemas.UserCreate(
        last_names='QUÍMICA',
        names='SECRETARIA POSGRADO DE ',
        identification_number='SECREPOSQUIMICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=7,
        rol_id=8,
        email='apoyo.posgradosquimica@udea.edu.co',
        active=True,
        password=settings.secretaria_coordinador_posgrado_quimica_password
    ),
    schemas.UserCreate(
        last_names='QUÍMICA',
        names='COORDINADOR PREGRADO DE ',
        identification_number='COORDPREQUIMICA',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=7,
        rol_id=7,
        email='pregradoquimica@udea.edu.co',
        active=True,
        password=settings.coordinador_pregrado_quimica_password
    ),

    # EXTENSION_FCEN
    schemas.UserCreate(
        last_names='EXTENSIÓN FCEN',
        names='DIRECTOR DE',
        identification_number='DIRECTOREXTENSION',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=8,
        rol_id=5,
        email='coordinacionextensionfcen@udea.edu.co',
        active=True,
        password=settings.director_extension_password
    ),
    schemas.UserCreate(
        last_names='DIRECCIÓN EXTENSIÓN FCEN',
        names='SECRETARIA DE',
        identification_number='SECREEXTENSION',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=8,
        rol_id=6,
        email='apoyocoordinacionextensionfcen@udea.edu.co',
        active=True,
        password=settings.secretaria_director_extension_password
    ),
    # CIEN_FCEN
    schemas.UserCreate(
        last_names='CIEN FCEN',
        names='DIRECTOR DE',
        identification_number='DIRECTORCIEN',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=9,
        rol_id=5,
        email='cien@udea.edu.co',
        active=True,
        password=settings.director_cien_password
    ),
    schemas.UserCreate(
        last_names='DIRECCIÓN CIEN FCEN',
        names='SECRETARIA DE',
        identification_number='SECRECIEN',
        scale='VINCULADO',
        vinculation_type='Tiempo completo',
        department_id=9,
        rol_id=6,
        email='apoyocien@udea.edu.co',
        active=True,
        password=settings.secretaria_director_cien_password
    ),

    # FING
    schemas.UserCreate(
        last_names='FING',
        names='DECANO DE',
        identification_number='DECANOFING',
        scale='Decanatura',
        vinculation_type='Tiempo completo',
        department_id=10,
        rol_id=3,
        email='pruebadecaingenieria@udea.edu.co',
        active=True,
        password=settings.decano_fing_password
    ),

    schemas.UserCreate(
        last_names='FING',
        names='SECRETARIA DECANO DE',
        identification_number='SECREDECANOFING',
        scale='Decanatura',
        vinculation_type='Tiempo completo',
        department_id=10,
        rol_id=4,
        email='apoyodecaingenieria@udea.edu.co',
        active=True,
        password=settings.secretaria_decano_fing_password
    ),
    # schemas.UserCreate(
    #     last_names='GARCÍA LUJÁN',
    #     names='SIMÓN',
    #     identification_number='1001987844',
    #     scale='Estudiante',
    #     vinculation_type='NO APLICA',
    #     department_id=3,
    #     rol_id=11,
    #     email='simon.garcial@udea.edu.co',
    #     active=False,
    #     password='123'
    # ),
    # schemas.UserCreate(
    #     last_names='MUÑOS ACEVEDO',
    #     names='JUAN CARLOS',
    #     identification_number='987654321',
    #     scale='VINCULADO',
    #     vinculation_type='TIEMPO COMPLETO',
    #     department_id=3,
    #     rol_id=9,
    #     email='muñoz.fake@udea.edu.co',
    #     active=True,
    #     password='123'
    # ),
    # schemas.UserCreate(
    #     last_names='MUÑOS ACEVEDO',
    #     names='JUAN CARLOSDOS',
    #     identification_number='9876543211',
    #     scale='VINCULADO',
    #     vinculation_type='TIEMPO COMPLETO',
    #     department_id=4,
    #     rol_id=9,
    #     email='muñoz.fakedos@udea.edu.co',
    #     active=True,
    #     password='123'
    # ),
    # schemas.UserCreate(
    #     last_names='QUIMICA',
    #     names='PROFESOR',
    #     identification_number='1239845651',
    #     scale='VINCULADO',
    #     vinculation_type='TIEMPO COMPLETO',
    #     department_id=5,
    #     rol_id=9,
    #     email='profesor.quimica@udea.edu.co',
    #     active=True,
    #     password='123'
    # ),
    # schemas.UserCreate(
    #     last_names='COORDINADOR',
    #     names='QUIMICA',
    #     identification_number='COORDQUIMICA',
    #     scale='VINCULADO',
    #     vinculation_type='TIEMPO COMPLETO',
    #     department_id=5,
    #     rol_id=7,
    #     email='coordquimica@udea.edu.co',
    #     active=True,
    #     password='123'
    # ),
    # schemas.UserCreate(
    #     last_names='COORDINADOR',
    #     names='FISICA',
    #     identification_number='COORDFISICA',
    #     scale='VINCULADO',
    #     vinculation_type='TIEMPO COMPLETO',
    #     department_id=3,
    #     rol_id=7,
    #     email='coordfisica@udea.edu.co',
    #     active=True,
    #     password='123'
    # ),
    # schemas.UserCreate(
    #     last_names='EMPLEADO',
    #     names='FISICA',
    #     identification_number='EMPLEADOFISICA',
    #     scale='VINCULADO',
    #     vinculation_type='TIEMPO COMPLETO',
    #     department_id=3,
    #     rol_id=10,
    #     email='empleado.fisica@udea.edu.co',
    #     active=True,
    #     password='123'
    # ),
    # schemas.UserCreate(
    #     last_names='COORDINADOR',
    #     names='SISTEMAS',
    #     identification_number='COORDSISTEMAS',
    #     scale='VINCULADO',
    #     vinculation_type='TIEMPO COMPLETO',
    #     department_id=4,
    #     rol_id=7,
    #     email='coordsistemas@udea.edu.co',
    #     active=True,
    #     password='123'
    # ),
    # schemas.UserCreate(
    #     last_names='DECANO',
    #     names='FING',
    #     identification_number='DECANOFING',
    #     scale='VINCULADO',
    #     vinculation_type='TIEMPO COMPLETO',
    #     department_id=4,
    #     rol_id=3,
    #     email='decanofing@udea.edu.co',
    #     active=True,
    #     password='123'
    # ),
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
        description='Facultad de Ciencias Exactas y Naturales',
        cost_center=21402601,
        email_dean='decaexactas@udea.edu.co',
        direction='Ciudad Universitaria: Calle 67 N. o 53-108. Bloque 1, oficina 115 Recepción de correspondencia: Calle 70 N.o 52-21',
        contact='Teléfonos: 219 56 00 NIT: 890.980.040-8 Apartado: 1226',
        dean='Adriana Echavarría Isaza'
    ),
    schemas.SchoolCreate(
        name='FING',
        description='Facultad de Ingeniería',
        cost_center=21301601,
        email_dean='decaingenieria@udea.edu.co',
        direction='Calle 67 No. 53 108 Bloques 18, 19, 20 y 21, Medellín, Antioquia',
        contact='Teléfonos: 2198130',
        dean='Jesús Francisco Vargas Bonilla'
    )
]


init_departments: List[schemas.DepartmentCreate] = [
    schemas.DepartmentCreate(
        name='ADMIN',
        description='Administradores',
        coord_email='simongarcia3640@gmail.com',
        school_id=1
    ),
    # FCEN
    schemas.DepartmentCreate(
        name='DECANATURA FCEN',
        description='Departamento Decanatura de la Facultad de Ciencias Exactas y Naturales',
        coord_email='decaexactas@udea.edu.co',
        school_id=2,
        cost_center=21402601
    ),
    schemas.DepartmentCreate(
        name='VICEDECANATURA FCEN',
        description='Departamento Vicedecanatura de la Facultad de Ciencias Exactas y Naturales',
        coord_email='vicedecacen@udea.edu.co',
        school_id=2,
        cost_center=21402601
    ),
    schemas.DepartmentCreate(
        name='MATEMÁTICAS',
        description='Instituto de Matemáticas',
        coord_email="institutomatematicas@udea.edu.co",
        cost_center=21401201,
        school_id=2,
    ),
    schemas.DepartmentCreate(
        name='FÍSICA',
        description='Instituto de Física',
        coord_email='institutofisica@udea.edu.co',
        school_id=2,
        cost_center=21401202
    ),
    schemas.DepartmentCreate(
        name='BIOLOGÍA',
        description='Instituto de Biología',
        coord_email="institutobiologia@udea.edu.co",
        cost_center=21401203,
        school_id=2,
    ),
    schemas.DepartmentCreate(
        name='QUÍMICA',
        description='Instituto de Química',
        coord_email="institutoquimica@udea.edu.co",
        cost_center=21401204,
        school_id=2
    ),
    schemas.DepartmentCreate(
        name='EXTENSION FCEN',
        description='Centreo de Extensión',
        coord_email="coordinacionextensionfcen@udea.edu.co",
        cost_center=21402601,
        school_id=2
    ),
    schemas.DepartmentCreate(
        name='CIEN FCEN',
        description='Centreo de Investigación',
        coord_email="cien@udea.edu.co",
        cost_center=21402601,
        school_id=2
    ),
    # FING
    schemas.DepartmentCreate(
        name='DECANATURA FING',
        description='Departamento Decanatura de la Facultad de Ingeniería',
        coord_email='decaingenieria@udea.edu.co',
        school_id=3,
        cost_center=21301601
    ),
    schemas.DepartmentCreate(
        name='VICEDECANATURA FING',
        description='Departamento Vicedecanatura de la Facultad de Ingeniería',
        coord_email='vicedecaingenieria@udea.edu.co',
        school_id=3,
        cost_center=21301601
    ),
    schemas.DepartmentCreate(
        name='SISTEMAS',
        description='Departamento de Ingeniería de Sistemas',
        coord_email='jingsistemas@udea.edu.co',
        school_id=3,
        cost_center=21301209
    ),
    schemas.DepartmentCreate(
        name='QUÍMICA',
        description='Departamento de Ingeniería Química',
        coord_email='pregradoingquimica@udea.edu.co',
        school_id=3,
        cost_center=21301205
    ),
    schemas.DepartmentCreate(
        name='BIOINGENIERÍA',
        description='Departamento de Bioingeniería',
        coord_email='john.ochoa@udea.edu.co',
        school_id=3,
        cost_center=21301211
    ),
    schemas.DepartmentCreate(
        name='INDUSTRIAL',
        description='Departamento de Ingeniería Industrial',
        coord_email='pregradoingindustrial@udea.edu.co',
        school_id=3,
        cost_center=21301203
    ),
    schemas.DepartmentCreate(
        name='ELECTRÓNICA',
        description='Departamento de Ingeniería Electrónica',
        coord_email='augusto.salazar@udea.edu.co',
        school_id=3,
        cost_center=21301210
    ),
    schemas.DepartmentCreate(
        name='ELÉCTRICA',
        description='Departamento de Ingeniería Eléctrica',
        coord_email='jingelectrica@udea.edu.co',
        school_id=3,
        cost_center=21301208
    ),
    schemas.DepartmentCreate(
        name='AMBIENTAL',
        description='Departamento de Ingeniería Sanitaria y Ambiental',
        coord_email='jambiental@udea.edu.co',
        school_id=3,
        cost_center=21301206
    ),
    schemas.DepartmentCreate(
        name='TELECOMUNICACIONES',
        description='Programa de Ingeniería de Telecomunicaciones',
        coord_email='augusto.salazar@udea.edu.co',
        school_id=3,
        cost_center=21301202
    ),
    schemas.DepartmentCreate(
        name='MECÁNICA',
        description='Programa de Ingeniería Mecánica',
        coord_email='pedro.leon@udea.edu.co',
        school_id=3,
        cost_center=21301207
    ),
    schemas.DepartmentCreate(
        name='MATERIALES',
        description='Programa de Ingeniería de Materiales',
        coord_email='francisco.herrera@udea.edu.co',
        school_id=3,
        cost_center=21301204
    ),
    schemas.DepartmentCreate(
        name='CIVIL',
        description='Programa de Ingeniería Civil',
        coord_email='jambiental@udea.edu.co',
        school_id=3,
        cost_center=21301201
    ),

]


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
            schemas.application_type.StatusFlux(status="SOLICITADA", scope=[0]),
            schemas.application_type.StatusFlux(status='APROBADA', scope=[5])
        ],
        who_can=[9]
    )
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
    schemas.ApplicationSubTypeCreate(
        name="Dedicación",
        application_type_id=3
    )
]
