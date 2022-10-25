from fastapi import APIRouter

from app.api.versions.v1.routes import user, auth

#APIRouter de fastapi nos permite generar endpoints o en su defecto con el método include_router incluir toda una ruta
api_route = APIRouter()
api_route.include_router(user.router, prefix="/user", tags=["user"])
api_route.include_router(auth.router, prefix="/login", tags=["auth"])