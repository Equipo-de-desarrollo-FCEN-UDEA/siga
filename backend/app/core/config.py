from functools import lru_cache
from locale import setlocale, LC_TIME

from typing import Type, Dict

from app.core.settings.app import AppSettings
from app.core.settings.base import AppEnv, BaseAppSettings
from app.core.settings import DevelopmentAppSettings, ProductionAppSettings, TestingAppSettings

environments: Dict[AppEnv, Type[AppSettings]] = {
    AppEnv.Development: DevelopmentAppSettings,
    AppEnv.Production: ProductionAppSettings,
    AppEnv.Testing: TestingAppSettings
}


setlocale(LC_TIME, 'es_ES.UTF-8')


# Aquí generamos la configuración de la aplicación y la almacenamos en la caché de python
@lru_cache
def get_app_settings() -> AppSettings:
    app_env = BaseAppSettings().env
    config = environments[app_env]
    return config()
