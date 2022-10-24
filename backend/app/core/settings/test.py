from app.core.settings.app import AppSettings

class TestingAppSettings(AppSettings):
    debug: bool = True
    title: str = "FastAPI seleccion-cidenet backend Testing"
    class Config:
        env_file = "test.env"
    