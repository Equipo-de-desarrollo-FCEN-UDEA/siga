from fastapi import APIRouter

from app.api.versions.v1.routes import user, auth, department, school

# APIRouter de fastapi nos permite generar endpoints o en su defecto con el método include_router incluir toda una ruta
api_route = APIRouter()
api_route.include_router(user.router, prefix="/user", tags=["user"])
api_route.include_router(auth.router, prefix="/login", tags=["auth"])
api_route.include_router(
    department.router, prefix="/department", tags=['departments'])
api_route.include_router(
    school.router, prefix='/school', tags=["schools"])