import logging

from app.core.settings.app import AppSettings

class DevelopmentAppSettings(AppSettings):
    
    debug: bool = True 
    
    title: str = "FastAPI siga backend development"
    
    logging_level: int = logging.DEBUG
    
    class Config:
        env_file = ".env"
