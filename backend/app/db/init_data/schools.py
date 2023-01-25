from typing import List

from app.domain import schemas

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