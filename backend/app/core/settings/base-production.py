from enum import Enum

from pydantic import BaseSettings

#Esta clase simplemente nos ayudará a entregar el archivo de entorno dependiendo el caso
class AppEnv(Enum):
    Development: str = "development"
    Production: str = "production"
    Testing: str = "testing"

class BaseAppSettings(BaseSettings):
    env: AppEnv = AppEnv.Production
    class Config:
        env_file = ".env"

