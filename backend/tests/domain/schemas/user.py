from pytest import raises

from app.domain.schemas import UserCreate


def test_schema_user():
    user1 = UserCreate(
        names="SIMON DE LA ROSA",
        lastNames="GARCIA LUJAN",
        identificationNumber="1234567890",
        email="simon.garcial@udea.edu.co",
        scale="Vinculado",
        vinculationType="TIEMPO COMPLETO",
        department_id=1,
        rol_id=1
    )
    # Contraseña automática
    assert user1.password == user1.identificationNumber
    # Activo automático
    assert user1.active == True
    assert user1.identificationType == 'CC'
    # Regex correo
    with raises(ValueError):
        UserCreate(
            names="SIMON DE LA ROSA",
            lastNames="GARCIA LUJAN",
            identificationNumber="1231233",
            email="simon.garcial@gmail.com",
            scale="Vinculado",
            department_id=1,
            rol_id=1
        )
    # Regex apellido
    with raises(ValueError):
        UserCreate(
            names="SIMON DE LA ROSA",
            lastNames="GARCIA LUjAN",
            identificationNumber="1234567890",
            email="simon.garcial@udea.edu.co",
            scale="Vinculado",
            department_id=1,
            rol_id=1
        )
    # Regex cédula
    with raises(ValueError):
        UserCreate(
            names="SIMON DE LA ROSA",
            lastNames="GARCIA LUJAN",
            identificationNumber="1234567890+",
            email="simon.garcial@udea.edu.co",
            scale="Vinculado",
            department_id=1,
            rol_id=1
        )
    # Area mayor a 0
    with raises(ValueError):
        UserCreate(
            names="SIMON DE LA ROSA",
            lastNames="GARCIA LUJAN",
            identificationNumber="1234567890",
            email="simon.garcial@udea.edu.co",
            scale="Vinculado",
            department_id=1,
            rol_id=1
        )
