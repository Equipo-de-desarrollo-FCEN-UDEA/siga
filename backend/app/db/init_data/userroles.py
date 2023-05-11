from typing import List

from app.domain import schemas

init_users_rol: List[schemas.UserRolCreate] = [
    schemas.UserRolCreate(
    #Admin
        rol_id = 1,
        user_id = 1
    ),
    schemas.UserRolCreate(
    #DECANATURA FCEN
        rol_id = 3,
        user_id = 2
    ),
    schemas.UserRolCreate(
    #secretarIa DECANOFCEN
        rol_id = 4,
        user_id = 3
    ),
    schemas.UserRolCreate(
    #VICEDECANATURA FCEN
        rol_id = 5,
        user_id = 4
    ),
    schemas.UserRolCreate(
    #secretaria VICEDECANOFCEN
        rol_id = 6,
        user_id = 5
    ),
    schemas.UserRolCreate(
    #Director Matemáticas
        rol_id = 5,
        user_id = 6
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados MATEMÁTICAS
        rol_id = 7,
        user_id = 7
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados MATEMÁTICAS
        rol_id = 8,
        user_id = 8
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado MATEMÁTICAS
        rol_id = 7,
        user_id = 9
    ),
    schemas.UserRolCreate(
    #Director FÍSICA
        rol_id = 5,
        user_id = 10
    ),
    schemas.UserRolCreate(
    #Secretaria FÍSICA
        rol_id = 6,
        user_id = 11
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados FÍSICA
        rol_id = 7,
        user_id = 12
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados FÍSICA
        rol_id = 8,
        user_id = 13
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado FÍSICA
        rol_id = 7,
        user_id = 14
    ),
    #BIOLOGÍA
    schemas.UserRolCreate(
    #Director BIOLOGÍA
        rol_id = 5,
        user_id = 15
    ),
    schemas.UserRolCreate(
    #Secretaria BIOLOGÍA
        rol_id = 6,
        user_id = 16
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados BIOLOGÍA
        rol_id = 7,
        user_id = 17
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados BIOLOGÍA
        rol_id = 8,
        user_id = 18
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado BIOLOGÍA
        rol_id = 7,
        user_id = 19
    ),
     #QUÍMICA
    schemas.UserRolCreate(
    #Director QUÍMICA
        rol_id = 5,
        user_id = 20
    ),
    schemas.UserRolCreate(
    #Secretaria QUÍMICA
        rol_id = 6,
        user_id = 21
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados QUÍMICA
        rol_id = 7,
        user_id = 22
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados QUÍMICA
        rol_id = 8,
        user_id = 23
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado QUÍMICA
        rol_id = 7,
        user_id = 24
    ),
     #EXTENSIÓN_FCEN
    schemas.UserRolCreate(
    #Director Extensión FCEN
        rol_id = 5,
        user_id = 25
    ),
    schemas.UserRolCreate(
    #Secretaria Extensión FCEN
        rol_id = 6,
        user_id = 26
    ),
    schemas.UserRolCreate(
    #DIRECTOR CIEN FCEN
        rol_id = 5,
        user_id = 27
    ),
    schemas.UserRolCreate(
    #secretaria DIRECTOR CIEN FCEN
        rol_id = 6,
        user_id = 28
    ),
    #FING
    schemas.UserRolCreate(
    #DECANO FING
        rol_id = 3,
        user_id = 29
    ),
    schemas.UserRolCreate(
    #SECRETARÍA DECANO FING
        rol_id = 4,
        user_id = 30
    ),
    
]