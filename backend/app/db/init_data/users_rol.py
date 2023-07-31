from typing import List

from app.domain import schemas

init_users_rol: List[schemas.UserRolCreate] = [
    schemas.UserRolCreate(
    #Admin
        rol_id = 1,
        user_id = 1,
        description= "Administrador SIGA"
    ),
    schemas.UserRolCreate(
    #DECANATURA FCEN
        rol_id = 3,
        user_id = 2,
        description="Decano FCEN"
    ),
    schemas.UserRolCreate(
    #secretarIa DECANOFCEN
        rol_id = 4,
        user_id = 3,
        description="Secretaria Decanatura FCEN"
    ),
    schemas.UserRolCreate(
    #VICEDECANATURA FCEN
        rol_id = 5,
        user_id = 4,
        description="Vicedecano FCEN"
    ),
    schemas.UserRolCreate(
    #secretaria VICEDECANOFCEN
        rol_id = 6,
        user_id = 5,
        description="Secretaria vicedecanatura FCEN"
    ),
    schemas.UserRolCreate(
    #Director Matemáticas
        rol_id = 5,
        user_id = 6,
        description="Director Matemáticas"
    ),
    schemas.UserRolCreate(
    #Secretaria MATEMÁTICAS
        rol_id = 6,
        user_id = 7,
        description="Secretaria Dirección de Matemáticas"
    ),
    
    schemas.UserRolCreate(
    #Coordinador posgrados MATEMÁTICAS
        rol_id = 7,
        user_id = 8,
        description="Coordinador de Posgrados de Matemáticas"
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados MATEMÁTICAS
        rol_id = 8,
        user_id = 9,
        description="Secretaria de Posgrados de Matemáticas"
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado MATEMÁTICAS
        rol_id = 7,
        user_id = 10,
        description="Coordinador de Pregrado de Matemáticas"
    ),
     schemas.UserRolCreate(
        user_id = 11,
        description="Director Física"
    ),
    schemas.UserRolCreate(
    #Secretaria FÍSICA
        rol_id = 6,
        user_id = 12,
        description="Secretaria de Dirección de Física"
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados FÍSICA
        rol_id = 7,
        user_id = 13,
        description="Coordinador de Posgrados de Física"
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados FÍSICA
        rol_id = 8,
        user_id = 14,
        description="Secretaría de Posgrados de Física"
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado FÍSICA
        rol_id = 7,
        user_id = 15,
        description="Coordinador de Pregrado de Física"
    ),
    #BIOLOGÍA
    schemas.UserRolCreate(
    #Director BIOLOGÍA
        rol_id = 5,
        user_id = 16,
        description="Director Biología"
    ),
    schemas.UserRolCreate(
    #Secretaria BIOLOGÍA
        rol_id = 6,
        user_id = 17,
        description="Secretaria Dirección de Biología"
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados BIOLOGÍA
        rol_id = 7,
        user_id = 18,
        description="Coordinador de Posgrados de Biología"
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados BIOLOGÍA
        rol_id = 8,
        user_id = 19,
        description="Secretaria Coordinación de Posgrados de Biología"
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado BIOLOGÍA
        rol_id = 7,
        user_id = 20,
        description="Coordinador de Pregrado de Biología"
    ),
     #QUÍMICA
    schemas.UserRolCreate(
    #Director QUÍMICA
        rol_id = 5,
        user_id = 21,
        description="Director de Química"
    ),
    schemas.UserRolCreate(
    #Secretaria QUÍMICA
        rol_id = 6,
        user_id = 22,
        description="Secretaria de Dirección de Química"
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados QUÍMICA
        rol_id = 7,
        user_id = 23,
        description="Coordinador de Posgrados de Química"
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados QUÍMICA
        rol_id = 8,
        user_id = 24,
        description="Secretaria de coordinación de Posgrados de Química"
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado QUÍMICA
        rol_id = 7,
        user_id = 25,
        description="Coordinador de Pregrado de Química"
    ),
     #EXTENSIÓN_FCEN
    schemas.UserRolCreate(
    #Director Extensión FCEN
        rol_id = 5,
        user_id = 26,
        description="Director de Extensión FCEN"
    ),
    schemas.UserRolCreate(
    #Secretaria Extensión FCEN
        rol_id = 6,
        user_id = 27,
        description="Secretaria de Dirección de Extensión FCEN"
    ),
    schemas.UserRolCreate(
    #DIRECTOR CIEN FCEN
        rol_id = 5,
        user_id = 28,
        description="Director CIEN"
    ),
    schemas.UserRolCreate(
    #secretaria DIRECTOR CIEN FCEN
        rol_id = 6,
        user_id = 29,
        description="Secretaria de Dirección de CIEN"
    ),
    #FING
    schemas.UserRolCreate(
    #DECANO FING
        rol_id = 3,
        user_id = 30,
        description="Decano de FING"
    ),
    schemas.UserRolCreate(
    #SECRETARÍA DECANO FING
        rol_id = 4,
        user_id = 31,
        description="Secretaria de Decanatura de FING"
    ),
    
]