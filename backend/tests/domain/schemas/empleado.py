from datetime import datetime, timedelta

from pytest import raises
from pydantic import ValidationError

from app.domain.schemas import UsuarioCreate


def test_schema_usuario():
    usuario1 = UsuarioCreate(
        primerApellido="GARCIA",
        segundoApellido="LUJAN",
        primerNombre="SIMON",
        pais="COLOMBIA",
        numeroIdentificacion="CC-1001987844",
        fechaIngreso=datetime.now(),
        area_id=2
    )
    #Contraseña automática
    assert usuario1.password == usuario1.numeroIdentificacion 
    #Activo automático
    assert usuario1.activo == True
    #No super usuario por defecto
    assert usuario1.is_superuser == False
    #Regex
    with raises(ValueError):
        UsuarioCreate(
            primerApellido="GARCIA",
            segundoApellido="LUJAN",
            primerNombre="SIMOn",
            pais="COLOMBIA",
            numeroIdentificacion="CC-1001987844",
            fechaIngreso=datetime.now(),
            area_id=2
        )
    with raises(ValueError):
        UsuarioCreate(
            primerApellido="GARCIA",
            segundoApellido="LUjAN",
            primerNombre="SIMON",
            pais="COLOMBIA",
            numeroIdentificacion="CC-1001987844",
            fechaIngreso=datetime.now(),
            area_id=2
        )
    with raises(ValueError):
        UsuarioCreate(
            primerApellido="GARCIA",
            segundoApellido="LUJAN",
            primerNombre="SIMON",
            pais="COLOMBIA",
            numeroIdentificacion="CC-1001987844",
            fechaIngreso=datetime.now() - timedelta(50),
            area_id=2
        )
    with raises(ValidationError):
        UsuarioCreate(
            primerApellido="GARCIA",
            segundoApellido="LUJAN",
            primerNombre="SIMON",
            pais="COLOMBIA",
            numeroIdentificacion="CC-1001987844.+",
            fechaIngreso=datetime.now() - timedelta(50),
            area_id=0
        )
    #Area mayor a 0
    with raises(ValueError):
        UsuarioCreate(
            primerApellido="GARCIA",
            segundoApellido="LUJAN",
            primerNombre="SIMON",
            pais="COLOMBIA",
            numeroIdentificacion="CC-1001987844",
            fechaIngreso=datetime.now() - timedelta(50),
            area_id=0
        )
