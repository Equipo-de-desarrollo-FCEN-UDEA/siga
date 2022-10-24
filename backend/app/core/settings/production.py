from app.core.settings.app import AppSettings

class ProductionAppSettings(AppSettings):
    debug: bool = False 
    title: str = "FastAPI seleccion-cidenet backend production"
    class Config:
        env_file = "prod.env"
    