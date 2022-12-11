import logging
from typing import Any, Dict, Optional, Tuple, Union

from pydantic import PostgresDsn, SecretStr, validator, RedisDsn, MongoDsn, AnyHttpUrl

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
    reset_password_expire_token: int

    max_connection_count: int = 10
    min_connection_count: int = 10

    secret_key: SecretStr

    backend_cors_origins: list[AnyHttpUrl] = []

    @validator("backend_cors_origins", pre=True)
    def assemble_cors_origins(cls, v: Union[str, list[str]]) -> Union[list[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # postgres
    postgres_server: str
    postgres_user: str
    postgres_password: str
    postgres_db: str

    # redis
    redis_server: str
    redis_path: str

    # mongo
    mongo_server: str
    mongo_initdb_root_username: str
    mongo_initdb_root_password: str
    mongo_initdb_database: str

    # first_superemployee_correo : str
    first_superemployee_password: str
    first_superemployee_last_names: str
    first_superemployee_names: str
    first_superemployee_email: str
    first_superemployee_identification_number: str
    first_superemployee_department_id: int
    first_superemployee_vinculation_type: str
    first_superemployee_rol_id: int
    decano_fing_password: str
    
    # PASSWORD_USERS_DECANOS_FCEN
    decano_fcen_password: str
    secretaria_decano_fcen_password: str

    # PASSWORD_USERS_VICEDECANO_FCEN
    vicedecano_fcen_password: str
    secretaria_vicedecano_fcen_password: str

    # PASSWORD_USERS_MATEMÁTICAS_FCEN
    director_matematicas_password: str
    secretaria_director_matematicas_password: str
    coordinador_posgrado_matematicas_password: str
    secretaria_coordinador_posgrado_matematicas_password: str
    coordinador_pregrado_matematicas_password: str

    # PASSWORD_USERS_FISICA_FCEN
    director_fisica_password: str
    secretaria_director_fisica_password: str
    coordinador_posgrado_fisica_password: str
    secretaria_coordinador_posgrado_fisica_password: str
    coordinador_pregrado_fisica_password: str

    # PASSWORD_USERS_BIOLOGÍA_FCEN
    director_biologia_password: str
    secretaria_director_biologia_password: str
    coordinador_posgrado_biologia_password: str
    secretaria_coordinador_posgrado_biologia_password: str
    coordinador_pregrado_biologia_password: str

    # PASSWORD_USERS_QUÍMICA_FCEN
    director_quimica_password: str
    secretaria_director_quimica_password: str
    coordinador_posgrado_quimica_password: str
    secretaria_coordinador_posgrado_quimica_password: str
    coordinador_pregrado_quimica_password: str

    # PASSWORD_USERS_EXTENSIÓN_FCEN
    director_extension_password: str
    secretaria_director_extension_password: str

    # PASSWORD_USERS_EXTENSIÓN_FCEN
    director_cien_password: str
    secretaria_director_cien_password: str

    # PASSWORD_USERS_DECANOS_FING
    decano_fing_password: str
    secretaria_decano_fing_password: str

    # SMTP
    smtp_user_email: str
    smtp_user_password: SecretStr
    smtp_host_email: str
    smtp_port_email: int
    smtp_from_email: str

    # AWS
    aws_user: str
    aws_access_key_id: str
    aws_access_secret_key: str
    aws_region_name: str
    aws_bucket_name: str

    # App

    APP_DOMAIN: str

    database_uri: Optional[PostgresDsn] = None

    redis_uri: Optional[RedisDsn] = None

    mongo_uri: Optional[MongoDsn] = None

    algorithm: str

    logging_level: int = logging.INFO
    loggers: Tuple[str, str] = ("uvicorn.asgi", "uvicorn.access")

    # En este validador de pydantic que nos sirve para asignar valores a ciertas variables
    # o también para hacer una validación mas rigurosa, de esta manera estamos generando el Dsn
    # por el que nos vamos a conectar a la base de datos de postgresql
    @validator("database_uri", pre=True)
    def validate_database_uri(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get('postgres_user'),
            password=values.get('postgres_password'),
            host=values.get('postgres_server'),
            path=f"/{values.get('postgres_db')}"
        )

    # Al igual que la anterior generamos el Dsn para redis
    @validator("redis_uri", pre=True)
    def validate_redis_uri(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        return RedisDsn.build(
            scheme="redis",
            host=values.get('redis_server'),
            path=f"/{values.get('redis_path')}"
        )

    @validator('mongo_uri', pre=True)
    def validate_mongo_uri(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        return MongoDsn.build(
            scheme='mongodb',
            host=values.get('mongo_server'),
            user=values.get('mongo_initdb_root_username'),
            password=values.get('mongo_initdb_root_password')
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
