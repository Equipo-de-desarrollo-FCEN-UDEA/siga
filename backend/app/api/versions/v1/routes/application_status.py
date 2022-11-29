from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from odmantic.session import AIOSession

from app.api.middlewares import db, jwt_bearer, mongo_db
from app.services import crud, documents
from app.domain.schemas import Application_statusCreate, Application_statusInDB
from app.domain.models import User
from app.domain.errors import BaseErrors

router = APIRouter()


@router.post('/', response_model=Application_statusInDB)
async def create_application_status(
    application_status: Application_statusCreate,
    *,
    db: Session = Depends(db.get_db),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    current_user: User = Depends(jwt_bearer.get_current_active_user),
) -> Application_statusInDB:
    try:
        application = crud.application.get(
            db, current_user, id=application_status.application_id)
        response = crud.application_status.create(
            db, current_user, obj_in=application_status, to=application)
        

        # Cases of document generation
        # Commision
        if (response.status.name == 'APROBADA' and
                application.application_sub_type.application_type.name == "COMISIÓN"):
            await documents.commission_resolution_generation(user=application.user, application=application, mong_db=engine)

        # Permission
        if (response.status.name == 'APROBADA' and
                application.application_sub_type.application_type.name == "PERMISO"):
            await documents.permission_resolution_generation(user=application.user, application=application, mong_db=engine)

    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return response
