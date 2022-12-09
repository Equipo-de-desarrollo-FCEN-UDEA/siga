from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.versions.v1.router import api_route
from app.core.config import get_app_settings
from app.db.init_db import init_db

def run_app():
    settings = get_app_settings()
    application = FastAPI(**settings.fastapi_kwargs)
    application.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.backend_cors_origins],
        allow_methods=["*"],
        allow_credentials=True,
        allow_headers=["*"],
        expose_headers=["*"]
    )
    application.include_router(api_route, prefix=settings.api_prefix_v1)
    init_db()
    return application


app = run_app()