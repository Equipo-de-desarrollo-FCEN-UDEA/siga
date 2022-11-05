from typing import List

from app.domain import schemas
from app.core.config import get_app_settings

settings = get_app_settings()

init_users: List[schemas.UserCreate] = [
    schemas.UserCreate(
        lastNames=settings.first_superemployee_last_names,
        names=settings.first_superemployee_names,
        identificationNumber=settings.first_superemployee_identification_number,
        scale=settings.first_superemployee_vinculation_type,
        vinculationType=settings.first_superemployee_vinculation_type,
        department_id=settings.first_superemployee_department_id,
        rol_id=settings.first_superemployee_rol_id,
        email=settings.first_superemployee_email,
        password=settings.first_superemployee_password
    ),
    schemas.UserCreate(
        lastNames='FCEN',
        names='DECANO DE',
        identificationNumber='DECANOFCEN',
        scale='Decanatura',
        vinculationType='Tiempo completo',
        department_id=2,
        rol_id=3,
        email='fcen@udea.edu.co',
        password='123'
    ),
    schemas.UserCreate(
        lastNames='GARCÍA LUJÁN',
        names='SIMÓN',
        identificationNumber='1001987844',
        scale='Estudiante',
        vinculationType='NO APLICA',
        department_id=3,
        rol_id=9,
        email='simon.garcial@udea.edu.co',
        password='123'
    ),
    schemas.UserCreate(
        lastNames='MUÑOS ACEVEDO',
        names='JUAN CARLOS',
        identificationNumber='987654321',
        scale='VINCULADO',
        vinculationType='TIEMPO COMPLETO',
        department_id=3,
        rol_id=7,
        email='muñoz.fake@udea.edu.co',
        password='123'
    ),
    schemas.UserCreate(
        lastNames='MUÑOS ACEVEDO',
        names='JUAN CARLOSDOS',
        identificationNumber='9876543211',
        scale='VINCULADO',
        vinculationType='TIEMPO COMPLETO',
        department_id=4,
        rol_id=7,
        email='muñoz.fakedos@udea.edu.co',
        password='123'
    ),
    schemas.UserCreate(
        lastNames='QUIMICA',
        names='PROFESOR',
        identificationNumber='1239845651',
        scale='VINCULADO',
        vinculationType='TIEMPO COMPLETO',
        department_id=5,
        rol_id=7,
        email='profesor.quimica@udea.edu.co',
        password='123'
    ),
    schemas.UserCreate(
        lastNames='COORDINADOR',
        names='QUIMICA',
        identificationNumber='COORDQUIMICA',
        scale='VINCULADO',
        vinculationType='TIEMPO COMPLETO',
        department_id=5,
        rol_id=5,
        email='coordquimica@udea.edu.co',
        password='123'
    ),
    schemas.UserCreate(
        lastNames='COORDINADOR',
        names='FISICA',
        identificationNumber='COORDFISICA',
        scale='VINCULADO',
        vinculationType='TIEMPO COMPLETO',
        department_id=3,
        rol_id=5,
        email='coordfisica@udea.edu.co',
        password='123'
    ),
    schemas.UserCreate(
        lastNames='EMPLEADO',
        names='FISICA',
        identificationNumber='EMPLEADOFISICA',
        scale='VINCULADO',
        vinculationType='TIEMPO COMPLETO',
        department_id=3,
        rol_id=8,
        email='empleado.fisica@udea.edu.co',
        password='123'
    ),
]

init_schools: List[schemas.SchoolCreate] = [
    schemas.SchoolCreate(
        name='ADMIN',
        description='ADMIN',
        costCenter=0,
        emailDean='simongarcia3640@gmail.com'
    ),
    schemas.SchoolCreate(
        name='FCEN',
        description='Facultad de ciencias exactas y naturales',
        costCenter=21402601,
        emailDean='fcen@udea.edu.co'
    ),
    schemas.SchoolCreate(
        name='FING',
        description='Facultad de ingeniería',
        costCenter=21301601,
        emailDean='fing@udea.edu.co'
    )
]


init_departments: List[schemas.DepartmentCreate] = [
    schemas.DepartmentCreate(
        name='ADMIN',
        description='Administradores',
        coordEmail='simongarcia3640@gmail.com',
        school_id=1
    ),
    schemas.DepartmentCreate(
        name='DECANATURA',
        description='Departamento decanatura',
        coordEmail='fcen@udea.edu.co',
        school_id=2
    ),
    schemas.DepartmentCreate(
        name='FISICA',
        description='Instituto de Física',
        coordEmail='coordfisica@udea.edu.co',
        school_id=2
    ),
    schemas.DepartmentCreate(
        name='SISTEMAS',
        description='Ingeniería de sistemas',
        coordEmail='coordsistemas@udea.edu.co',
        school_id=3
    ),
    schemas.DepartmentCreate(
        name='QUÍMICA',
        description='Departamento de química',
        coordEmail="coordquimica@udea.edu.co",
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
        description='Secretaria Decanatura',
        scope=5
    ),
    schemas.RolCreate(
        name='Coordinador',
        description='Coordinador del instituto',
        scope=7
    ),
    schemas.RolCreate(
        name='Secretaria',
        description='Secreataria Coordinación',
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


init_states: List[schemas.StateCreate] = [
    schemas.StateCreate(
        name='SOLICITADA'
    ),
    schemas.StateCreate(
        name='VISTO BUENO'
    ),
    schemas.StateCreate(
        name='APROBADA'
    ),
    schemas.StateCreate(
        name='RECHAZADA COORDINACIÓN'
    ),
    schemas.StateCreate(
        name='RECHAZADA DECANATO'
    ),
    schemas.StateCreate(
        name='FINALIZADA'
    ),
    schemas.StateCreate(
        name='EN CREACIÓN'
    ),
    schemas.StateCreate(
        name='EN CURSO'
    )
]

init_applicationType: List[schemas.ApplicationTypeCreate] = [
    schemas.ApplicationTypeCreate(
        name="PERMISO",
        description="Permisos"
    ),
    schemas.ApplicationTypeCreate(
        name="COMISIÓN",
        description="Comisiones"
    ),
    schemas.ApplicationTypeCreate(
        name="DEDICACIÓN EXCLUSIVA",
        description="Dedicaciones exclusivas"
    )
]

init_applicationSubType: List[schemas.ApplicationSubTypeCreate] = [
    schemas.ApplicationSubTypeCreate(
        name="Licencia de maternidad",
        applicationType_id=1,
        extra={"days": 126}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Licencia de paternidad",
        applicationType_id=1,
        extra={"days": 8}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Cumpleaños",
        applicationType_id=1,
        extra={"days": 1}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Luto",
        applicationType_id=1,
        extra={"days": 5}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Calamidad doméstica",
        applicationType_id=1,
        extra={"days": 12}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Licencia no remunerada",
        applicationType_id=1,
        extra={"days": 60}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Permiso remunerado",
        applicationType_id=1,
        extra={"days": 3}
    ),
    schemas.ApplicationSubTypeCreate(
        name="Comisión de servicios",
        applicationType_id=2
    ),
    schemas.ApplicationSubTypeCreate(
        name="Comisión de estudios",
        applicationType_id=2
    ),
    schemas.ApplicationSubTypeCreate(
        name="Dedicación",
        applicationType_id=3
    )
]