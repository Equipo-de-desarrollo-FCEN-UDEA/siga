from fastapi import APIRouter

from app.api.versions.v1.routes import (
    documents,
    user,
    auth,
    department,
    school,
    rol,
    application_type,
    application,
    application_status
)

from app.api.versions.v1.routes.applications import permission, commission

# APIRouter de fastapi nos permite generar endpoints o en su defecto con el método include_router incluir toda una ruta
# Routes app
api_route = APIRouter()
api_route.include_router(user.router, prefix="/user", tags=["user"])
api_route.include_router(auth.router, prefix="/login", tags=["auth"])
api_route.include_router(
    department.router, prefix="/department", tags=['departments'])

api_route.include_router(
    school.router, prefix='/school', tags=["schools"])

api_route.include_router(rol.router, prefix="/rol", tags=["rol"])
api_route.include_router(application_type.router,
                         prefix='/application-type', tags=['application-types'])


api_route.include_router(application.router,
                         prefix="/application", tags=["application"])
api_route.include_router(application_status.router,
                         prefix="/application-status", tags=['application-status'])

# Applications
api_route.include_router(commission.router,
                         prefix="/commission", tags=['commission'])
api_route.include_router(
    permission.router, prefix="/permission", tags=['permission'])

api_route.include_router(
    permission.router, prefix="/permission", tags=['permission'])                         

# Documents
api_route.include_router(documents.router, prefix="/documents", tags=['documents'])
