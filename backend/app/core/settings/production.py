from app.core.settings.app import AppSettings


# Aquí cuando estemos en producción
class ProductionAppSettings(AppSettings):
    debug: bool = False
    title: str = "FastAPI siga backend production"

    class Config:
        env_file = "prod.env"
