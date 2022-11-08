from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import get_app_settings


#En este archivo lo que hacemos en crear la session en la base de datos

settings = get_app_settings()

engine = create_engine(settings.database_uri, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
