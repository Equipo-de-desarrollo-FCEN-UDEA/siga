from fastapi import APIRouter

from app.api.versions.v1.routes import usuario, auth

api_route = APIRouter()
api_route.include_router(usuario.router, prefix="/usuario", tags=["usuario"])
api_route.include_router(auth.router, prefix="/login", tags=["auth"])