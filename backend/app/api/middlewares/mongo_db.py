from app.db.mongo_session import engine
from app.core.logging import get_logging

log = get_logging(__name__)

async def get_mongo_db():
    try:
        db = engine.session()
        await db.start()
        yield db
    finally:
        await db.end()