from enum import Enum

from pydantic import BaseSettings

class AppEnv(Enum):
    Development: str = "development"
    Production: str = "production"
    Testing: str = "testing"

class BaseAppSettings(BaseSettings):
    env: AppEnv = AppEnv.Development
    class Config:
        env_file = ".env"

