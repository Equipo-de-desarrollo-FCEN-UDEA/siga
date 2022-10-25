from typing import Any

from sqlalchemy.ext.declarative import as_declarative, declared_attr


# Creamos un modelo base como base declarativa para que los modelos hereden de aquí
@as_declarative()
class Base:
    id: Any
    __name__: str

    @declared_attr
    def __tablename__(cls):
        return cls.__name__.lower()
