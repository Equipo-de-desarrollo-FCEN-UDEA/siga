from datetime import datetime, timedelta

from pytest import raises
from pydantic import ValidationError

from app.domain.schemas import UserCreate


def test_schema_user():
    user1 = UserCreate(
        primerApellido="GARCIA",
        segundoApellido="LUJAN",
        primerNombre="SIMON",
        pais="COLOMBIA",
        numeroIdentificacion="CC-1001987844",
        fechaIngreso=datetime.now(),
        area_id=2
    )
    #Contraseña automática
    assert user1.password == user1.numeroIdentificacion 
    #Activo automático
    assert user1.activo == True
    #No super user por defecto
    assert user1.is_superuser == False
    #Regex
    with raises(ValueError):
        UserCreate(
            primerApellido="GARCIA",
            segundoApellido="LUJAN",
            primerNombre="SIMOn",
            pais="COLOMBIA",
            numeroIdentificacion="CC-1001987844",
            fechaIngreso=datetime.now(),
            area_id=2
        )
    with raises(ValueError):
        UserCreate(
            primerApellido="GARCIA",
            segundoApellido="LUjAN",
            primerNombre="SIMON",
            pais="COLOMBIA",
            numeroIdentificacion="CC-1001987844",
            fechaIngreso=datetime.now(),
            area_id=2
        )
    with raises(ValueError):
        UserCreate(
            primerApellido="GARCIA",
            segundoApellido="LUJAN",
            primerNombre="SIMON",
            pais="COLOMBIA",
            numeroIdentificacion="CC-1001987844",
            fechaIngreso=datetime.now() - timedelta(50),
            area_id=2
        )
    with raises(ValidationError):
        UserCreate(
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
        UserCreate(
            primerApellido="GARCIA",
            segundoApellido="LUJAN",
            primerNombre="SIMON",
            pais="COLOMBIA",
            numeroIdentificacion="CC-1001987844",
            fechaIngreso=datetime.now() - timedelta(50),
            area_id=0
        )
