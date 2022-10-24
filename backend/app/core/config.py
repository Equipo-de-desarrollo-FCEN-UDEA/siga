from functools import lru_cache

from typing import Type, Dict

from app.core.settings.app import AppSettings
from app.core.settings.base import AppEnv, BaseAppSettings
from app.core.settings import DevelopmentAppSettings, ProductionAppSettings, TestingAppSettings

environments : Dict[AppEnv, Type[AppSettings]] = {
    AppEnv.Development: DevelopmentAppSettings,
    AppEnv.Production: ProductionAppSettings,
    AppEnv.Testing: TestingAppSettings
}

@lru_cache
def get_app_settings() -> AppSettings:
    app_env = BaseAppSettings().env
    config = environments[app_env]
    return config()