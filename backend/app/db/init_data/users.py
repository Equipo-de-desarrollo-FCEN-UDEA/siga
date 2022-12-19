from app.domain import schemas
from app.core.config import get_app_settings

settings = get_app_settings()

init_users: list[schemas.UserCreate] = [
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