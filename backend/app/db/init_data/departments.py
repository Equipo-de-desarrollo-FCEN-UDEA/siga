from typing import List

from app.domain import schemas

init_departments: List[schemas.DepartmentCreate] = [
    schemas.DepartmentCreate(
        director='nombre del director',
        name='ADMIN',
        description='Administradores',
        coord_email='simongarcia3640@gmail.com',
        school_id=1
    ),
    # FCEN
    schemas.DepartmentCreate(
        director='nombre del director',
        name='DECANATURA FCEN',
        description='Departamento Decanatura de la Facultad de Ciencias Exactas y Naturales',
        coord_email='decaexactas@udea.edu.co',
        school_id=2,
        cost_center=21460001
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='VICEDECANATURA FCEN',
        description='Departamento Vicedecanatura de la Facultad de Ciencias Exactas y Naturales',
        coord_email='vicedecacen@udea.edu.co',
        school_id=2,
        cost_center=21402601
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='MATEMÁTICAS',
        description='Instituto de Matemáticas',
        coord_email="institutomatematicas@udea.edu.co",
        cost_center=21420001,
        school_id=2,
    ),
    schemas.DepartmentCreate(
        director='Leonardo A. Pachón',
        name='FÍSICA',
        description='Instituto de Física',
        coord_email='institutofisica@udea.edu.co',
        school_id=2,
        cost_center=21420002
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='BIOLOGÍA',
        description='Instituto de Biología',
        coord_email="institutobiologia@udea.edu.co",
        cost_center=21420003,
        school_id=2,
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='QUÍMICA',
        description='Instituto de Química',
        coord_email="institutoquimica@udea.edu.co",
        cost_center=21420004,
        school_id=2
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='EXTENSION FCEN',
        description='Centreo de Extensión',
        coord_email="coordinacionextensionfcen@udea.edu.co",
        cost_center=21460002,
        school_id=2
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='CIEN FCEN',
        description='Centreo de Investigación',
        coord_email="cien@udea.edu.co",
        cost_center=21430002,
        school_id=2
    ),
    # FING
    schemas.DepartmentCreate(
        director='nombre del director',
        name='DECANATURA FING',
        description='Departamento Decanatura de la Facultad de Ingeniería',
        coord_email='decaingenieria@udea.edu.co',
        school_id=3,
        cost_center=21301601
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='VICEDECANATURA FING',
        description='Departamento Vicedecanatura de la Facultad de Ingeniería',
        coord_email='vicedecaingenieria@udea.edu.co',
        school_id=3,
        cost_center=21301601
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='SISTEMAS',
        description='Departamento de Ingeniería de Sistemas',
        coord_email='jingsistemas@udea.edu.co',
        school_id=3,
        cost_center=21301209
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='QUÍMICA',
        description='Departamento de Ingeniería Química',
        coord_email='pregradoingquimica@udea.edu.co',
        school_id=3,
        cost_center=21301205
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='BIOINGENIERÍA',
        description='Departamento de Bioingeniería',
        coord_email='john.ochoa@udea.edu.co',
        school_id=3,
        cost_center=21301211
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='INDUSTRIAL',
        description='Departamento de Ingeniería Industrial',
        coord_email='pregradoingindustrial@udea.edu.co',
        school_id=3,
        cost_center=21301203
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='ELECTRÓNICA',
        description='Departamento de Ingeniería Electrónica',
        coord_email='augusto.salazar@udea.edu.co',
        school_id=3,
        cost_center=21301210
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='ELÉCTRICA',
        description='Departamento de Ingeniería Eléctrica',
        coord_email='jingelectrica@udea.edu.co',
        school_id=3,
        cost_center=21301208
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='AMBIENTAL',
        description='Departamento de Ingeniería Sanitaria y Ambiental',
        coord_email='jambiental@udea.edu.co',
        school_id=3,
        cost_center=21301206
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='TELECOMUNICACIONES',
        description='Programa de Ingeniería de Telecomunicaciones',
        coord_email='augusto.salazar@udea.edu.co',
        school_id=3,
        cost_center=21301202
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='MECÁNICA',
        description='Programa de Ingeniería Mecánica',
        coord_email='pedro.leon@udea.edu.co',
        school_id=3,
        cost_center=21301207
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='MATERIALES',
        description='Programa de Ingeniería de Materiales',
        coord_email='francisco.herrera@udea.edu.co',
        school_id=3,
        cost_center=21301204
    ),
    schemas.DepartmentCreate(
        director='nombre del director',
        name='CIVIL',
        description='Programa de Ingeniería Civil',
        coord_email='jambiental@udea.edu.co',
        school_id=3,
        cost_center=21301201
    ),

]