from fastapi import APIRouter

from app.api.versions.v1.routes import user, auth

api_route = APIRouter()
api_route.include_router(user.router, prefix="/user", tags=["user"])
api_route.include_router(auth.router, prefix="/login", tags=["auth"])