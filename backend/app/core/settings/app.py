import logging
from typing import Any, Dict, Optional, Tuple

from pydantic import PostgresDsn, SecretStr, validator, RedisDsn, MongoDsn

from app.core.settings.base import BaseAppSettings


class AppSettings(BaseAppSettings):
    # En esta clase de pydantic nos dedicamos a generar la configuración de la aplicación,
    # pydantic automaticammente leerá las variables de entorno con las que encuentre similitud
    debug: bool = False
    docs_url: str = "/docs"
    openapi_prefix: str = ""
    openapi_url: str = "/openapi.json"
    redoc_url: str = "/redoc"
    title: str = "FastAPI Siga backend"
    version: str = "1.0.0"

    api_prefix_v1: str = "/api/v1"

    access_token_expires_minutes: int

    max_connection_count: int = 10
    min_connection_count: int = 10

    secret_key: SecretStr

    postgres_server: str
    postgres_user: str
    postgres_password: str
    postgres_db: str

    redis_server: str
    redis_path: str

    # first_superemployee_correo : str
    first_superemployee_password: str
    first_superemployee_last_names: str
    first_superemployee_names: str
    first_superemployee_email: str
    first_superemployee_identification_number: str
    first_superemployee_department_id: int
    first_superemployee_vinculation_type: str
    first_superemployee_rol_id: int

    database_url: Optional[PostgresDsn] = None

    redis_url: Optional[RedisDsn] = None

    algorithm: str

    logging_level: int = logging.INFO
    loggers: Tuple[str, str] = ("uvicorn.asgi", "uvicorn.access")

    # En este validador de pydantic que nos sirve para asignar valores a ciertas variables
    # o también para hacer una validación mas rigurosa, de esta manera estamos generando el Dsn
    # por el que nos vamos a conectar a la base de datos de postgresql
    @validator("database_url", pre=True)
    def validate_database_url(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get('postgres_user'),
            password=values.get('postgres_password'),
            host=values.get('postgres_server'),
            path=f"/{values.get('postgres_db')}"
        )

    # Al igual que la anterior generamos el Dsn para redis
    @validator("redis_url", pre=True)
    def validate_redis_url(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        return RedisDsn.build(
            scheme="redis",
            host=values.get('redis_server'),
            path=f"/{values.get('redis_path')}"
        )

    # Esta clase le dice a pydantic dónde buscará el archivo de entorno y cómo deverá leerlo
    class Config:
        validate_assignment = True
        env_file_encoding = 'utf-8'

    # El decorador property simplemente nos devolverá un diccionario con los datos de nuestra aplicación
    @property
    def fastapi_kwargs(self) -> Dict[str, Any]:
        return {
            "debug": self.debug,
            "docs_url": self.docs_url,
            "openapi_prefix": self.openapi_prefix,
            "openapi_url": self.openapi_url,
            "redoc_url": self.redoc_url,
            "title": self.title,
            "version": self.version,
        }
