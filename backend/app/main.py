from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from app.api.versions.v1.router import api_route
from app.core.config import get_app_settings
from app.core.debugger import initialize_fastapi_server_debugger_if_needed
from app.db.init_db import init_db

from app.core.logging import get_logging


log = get_logging(__name__)


def run_app():
    settings = get_app_settings()
    application = FastAPI(**settings.fastapi_kwargs)
    application.add_middleware(
        CORSMiddleware,
        allow_origins=['*'], #[str(origin)
                       #for origin in settings.backend_cors_origins],
        allow_methods=["*"],
        allow_credentials=True,
        allow_headers=["*"],
        expose_headers=["*"]
    )
    application.include_router(api_route, prefix=settings.api_prefix_v1)
    init_db()
    initialize_fastapi_server_debugger_if_needed()
    return application


app = run_app()




# @app.on_event("startup")
# @repeat_every(seconds=60, wait_first=True)
# async def setup_periodic_tasks():

#     log.debug('cron')
