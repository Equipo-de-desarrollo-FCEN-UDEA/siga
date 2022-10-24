from datetime import datetime
import logging
from typing import Any, Dict, Optional, Tuple

from loguru import logger
from pydantic import PostgresDsn, SecretStr, validator

from app.core.settings.base import BaseAppSettings



class AppSettings(BaseAppSettings):
    debug: bool = False
    docs_url: str = "/docs"
    openapi_prefix: str = ""
    openapi_url: str = "/openapi.json"
    redoc_url: str = "/redoc"
    title: str = "FastAPI seleccion-cidenet backend"
    version: str = "0.0.0"

    api_prefix_v1: str = "/api/v1"

    access_token_expires_minutes: int

    max_connection_count: int = 10
    min_connection_count: int = 10

    secret_key: SecretStr

    postgres_server: str
    postgres_user: str
    postgres_password: str
    postgres_db: str

    areas: list[str] = ['Administracion', 'Financiera', 'Compras',
                  'Infraestructura', 'Operacion', 'Talento Humano', 'Servicios Varios']

    # first_superemployee_correo : str
    first_superemployee_password: str
    first_superemployee_segundoapellido: str
    first_superemployee_primerapellido: str
    first_superemployee_primernombre: str
    first_superemployee_otrosnombres: str = None
    first_superemployee_pais: str
    first_superemployee_numeroidentificacion: str
    first_superemployee_area_id: int

    database_url: Optional[PostgresDsn] = None

    algorithm: str

    logging_level: int = logging.INFO
    loggers: Tuple[str, str] = ("uvicorn.asgi", "uvicorn.access")

    @validator("database_url", pre=True)
    def validate_database_url(cls, v: Optional[str], values: Dict[str, Any]) -> Any:
        return PostgresDsn.build(
            scheme="postgresql",
            user=values.get('postgres_user'),
            password=values.get('postgres_password'),
            host=values.get('postgres_server'),
            path=f"/{values.get('postgres_db')}",
        )

    class Config:
        validate_assignment = True
        env_file_encoding = 'utf-8'

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
