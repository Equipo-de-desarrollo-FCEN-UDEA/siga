from typing import List

from app.domain import schemas

init_users_rol: List[schemas.UserRolCreate] = [
    schemas.UserRolCreate(
    #Admin
        rol_id = 1,
<<<<<<< HEAD
        user_id = 1,
        description= "Administrador SIGA"
=======
        user_id = 1
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #DECANATURA FCEN
        rol_id = 3,
<<<<<<< HEAD
        user_id = 2,
        description="Decano FCEN"
=======
        user_id = 2
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #secretarIa DECANOFCEN
        rol_id = 4,
<<<<<<< HEAD
        user_id = 3,
        description="Secretaria Decanatura FCEN"
=======
        user_id = 3
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #VICEDECANATURA FCEN
        rol_id = 5,
<<<<<<< HEAD
        user_id = 4,
        description="Vicedecano FCEN"
=======
        user_id = 4
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #secretaria VICEDECANOFCEN
        rol_id = 6,
<<<<<<< HEAD
        user_id = 5,
        description="Secretaria vicedecanatura FCEN"
=======
        user_id = 5
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Director Matemáticas
        rol_id = 5,
<<<<<<< HEAD
        user_id = 6,
        description="Director Matemáticas"
=======
        user_id = 6
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Secretaria MATEMÁTICAS
        rol_id = 6,
<<<<<<< HEAD
        user_id = 7,
        description="Secretaria Dirección de Matemáticas"
=======
        user_id = 7
>>>>>>> task017b
    ),
    
    schemas.UserRolCreate(
    #Coordinador posgrados MATEMÁTICAS
        rol_id = 7,
<<<<<<< HEAD
        user_id = 8,
        description="Coordinador de Posgrados de Matemáticas"
=======
        user_id = 8
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados MATEMÁTICAS
        rol_id = 8,
<<<<<<< HEAD
        user_id = 9,
        description="Secretaria de Posgrados de Matemáticas"
=======
        user_id = 9
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado MATEMÁTICAS
        rol_id = 7,
<<<<<<< HEAD
        user_id = 10,
        description="Coordinador de Pregrado de Matemáticas"
=======
        user_id = 10
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Director FÍSICA
        rol_id = 5,
<<<<<<< HEAD
        user_id = 11,
        description="Director Física"
=======
        user_id = 11
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Secretaria FÍSICA
        rol_id = 6,
<<<<<<< HEAD
        user_id = 12,
        description="Secretaria de Dirección de Física"
=======
        user_id = 12
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados FÍSICA
        rol_id = 7,
<<<<<<< HEAD
        user_id = 13,
        description="Coordinador de Posgrados de Física"
=======
        user_id = 13
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados FÍSICA
        rol_id = 8,
<<<<<<< HEAD
        user_id = 14,
        description="Secretaría de Posgrados de Física"
=======
        user_id = 14
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado FÍSICA
        rol_id = 7,
<<<<<<< HEAD
        user_id = 15,
        description="Coordinador de Pregrado de Física"
=======
        user_id = 15
>>>>>>> task017b
    ),
    #BIOLOGÍA
    schemas.UserRolCreate(
    #Director BIOLOGÍA
        rol_id = 5,
<<<<<<< HEAD
        user_id = 16,
        description="Director Biología"
=======
        user_id = 16
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Secretaria BIOLOGÍA
        rol_id = 6,
<<<<<<< HEAD
        user_id = 17,
        description="Secretaria Dirección de Biología"
=======
        user_id = 17
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados BIOLOGÍA
        rol_id = 7,
<<<<<<< HEAD
        user_id = 18,
        description="Coordinador de Posgrados de Biología"
=======
        user_id = 18
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados BIOLOGÍA
        rol_id = 8,
<<<<<<< HEAD
        user_id = 19,
        description="Secretaria Coordinación de Posgrados de Biología"
=======
        user_id = 19
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado BIOLOGÍA
        rol_id = 7,
<<<<<<< HEAD
        user_id = 20,
        description="Coordinador de Pregrado de Biología"
=======
        user_id = 20
>>>>>>> task017b
    ),
     #QUÍMICA
    schemas.UserRolCreate(
    #Director QUÍMICA
        rol_id = 5,
<<<<<<< HEAD
        user_id = 21,
        description="Director de Química"
=======
        user_id = 21
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Secretaria QUÍMICA
        rol_id = 6,
<<<<<<< HEAD
        user_id = 22,
        description="Secretaria de Dirección de Química"
=======
        user_id = 22
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Coordinador posgrados QUÍMICA
        rol_id = 7,
<<<<<<< HEAD
        user_id = 23,
        description="Coordinador de Posgrados de Química"
=======
        user_id = 23
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #secretarIa posgrados QUÍMICA
        rol_id = 8,
<<<<<<< HEAD
        user_id = 24,
        description="Secretaria de coordinación de Posgrados de Química"
=======
        user_id = 24
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Coordinador pregrado QUÍMICA
        rol_id = 7,
<<<<<<< HEAD
        user_id = 25,
        description="Coordinador de Pregrado de Química"
=======
        user_id = 25
>>>>>>> task017b
    ),
     #EXTENSIÓN_FCEN
    schemas.UserRolCreate(
    #Director Extensión FCEN
        rol_id = 5,
<<<<<<< HEAD
        user_id = 26,
        description="Director de Extensión FCEN"
=======
        user_id = 26
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #Secretaria Extensión FCEN
        rol_id = 6,
<<<<<<< HEAD
        user_id = 27,
        description="Secretaria de Dirección de Extensión FCEN"
=======
        user_id = 27
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #DIRECTOR CIEN FCEN
        rol_id = 5,
<<<<<<< HEAD
        user_id = 28,
        description="Director CIEN"
=======
        user_id = 28
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #secretaria DIRECTOR CIEN FCEN
        rol_id = 6,
<<<<<<< HEAD
        user_id = 29,
        description="Secretaria de Dirección de CIEN"
=======
        user_id = 29
>>>>>>> task017b
    ),
    #FING
    schemas.UserRolCreate(
    #DECANO FING
        rol_id = 3,
<<<<<<< HEAD
        user_id = 30,
        description="Decano de FING"
=======
        user_id = 30
>>>>>>> task017b
    ),
    schemas.UserRolCreate(
    #SECRETARÍA DECANO FING
        rol_id = 4,
<<<<<<< HEAD
        user_id = 31,
        description="Secretaria de Decanatura de FING"
=======
        user_id = 31
>>>>>>> task017b
    ),
    
]