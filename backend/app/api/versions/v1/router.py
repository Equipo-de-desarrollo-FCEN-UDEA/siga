from fastapi import APIRouter

from app.api.versions.v1.routes import (
    documents,
    user,
    userrol,
    auth,
    department,
    extra,
    school,
    rol,
    extra,
    application_type,
    application_subtype,
    application,
    application_status,
    holiday,
    user_application
)

from app.api.versions.v1.routes.applications import permission, commission, full_time, hour_aval, vacation, economic_support

# APIRouter de fastapi nos permite generar endpoints o en su defecto con el método include_router incluir toda una ruta
# Routes app
api_route = APIRouter()
api_route.include_router(user.router,
                         prefix="/user", tags=["user"])
api_route.include_router(auth.router,
                         prefix="/login", tags=["auth"])
api_route.include_router(department.router,
                         prefix="/department", tags=['departments'])
api_route.include_router(extra.router,
                         prefix="/extra", tags=['extra'])
api_route.include_router(school.router,
                         prefix='/school', tags=["schools"])
api_route.include_router(rol.router,
                         prefix="/rol", tags=["rol"])
api_route.include_router(userrol.router,
                         prefix="/userrol", tags=["userrol"])

# Type Applications
api_route.include_router(application_type.router,
                         prefix='/application-type', tags=['application-types'])
api_route.include_router(application_subtype.router,
                         prefix='/application-sub-type', tags=['application-sub-types'])
api_route.include_router(application.router,
                         prefix="/application", tags=["application"])
api_route.include_router(application_status.router,
                         prefix="/application-status", tags=['application-status'])

# Documents
api_route.include_router(documents.router,
                         prefix="/documents", tags=['documents'])

# Holidays
api_route.include_router(holiday.router,
                         prefix="/holiday", tags=["holiday"])

api_route.include_router(extra.router,
                         prefix="/extra", tags=['extra'])

api_route.include_router(user_application.router,
                         prefix="/user_application", tags=['user_application'])

# Applications
api_route.include_router(commission.router,
                         prefix="/commission", tags=['commission'])
api_route.include_router(permission.router,
                         prefix="/permission", tags=['permission'])
api_route.include_router(full_time.router,
                         prefix='/full-time', tags=['full_time'])
api_route.include_router(hour_aval.router,
                         prefix='/hour-aval', tags=['hour-aval'])
api_route.include_router(vacation.router,
                         prefix='/vacation', tags=['vacation'])
api_route.include_router(economic_support.router,
                         prefix='/economic_support', tags=['economic_support'])
