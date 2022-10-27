from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.versions.v1.router import api_route
from app.core.config import get_app_settings
from app.core.logging import get_logging
from app.db.session import SessionLocal
from app.db.init_db import init_db

db = SessionLocal()

log = get_logging(__name__)

def run_app():
    settings = get_app_settings()
    application = FastAPI(**settings.fastapi_kwargs)
    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_credentials=True,
        allow_headers=["*"],
        expose_headers=["*"]
    )
    application.include_router(api_route, prefix=settings.api_prefix_v1)

    log.debug(settings.redis_url)

    init_db(db)
    db.close()
    return application


app = run_app()
