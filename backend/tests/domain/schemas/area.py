from pytest import raises

from app.domain.schemas import AreaCreate

def test_schema_area():
    area = AreaCreate(nombre="Admin")
    
    assert area.nombre == "Admin"
    with raises(ValueError):
        AreaCreate()