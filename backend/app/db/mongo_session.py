from motor.motor_asyncio import AsyncIOMotorClient
from odmantic import AIOEngine

from app.core.config import get_app_settings

settings = get_app_settings()

client = AsyncIOMotorClient(settings.mongo_uri, authSource="admin")

engine = AIOEngine(client=client, database=settings.mongo_initdb_database)

