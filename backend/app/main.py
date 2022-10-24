from fastapi import FastAPI


from app.api.versions.v1.router import api_route
from app.core.config import get_app_settings

from starlette.middleware.cors import CORSMiddleware

from app.db.session import SessionLocal
from app.db.init_db import init_db

db = SessionLocal()


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
    init_db(db)
    return application


app = run_app()
