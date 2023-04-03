from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.services import crud, emails
from app.domain.models import Vacation, User, Application
from app.domain.schemas import (ApplicationCreate,
                                VacationCreate,
                                VacationUpdate,
                                VacationResponse,
                                Msg,
                                ApplicationResponse,
                                Application_statusCreate)
from app.domain.errors import BaseErrors

router = APIRouter()

log = get_logging(__name__)

# crea una solicitud de vacaciones
@router.post("/", response_model=VacationResponse)
async def create_vacation(
    vacation: VacationCreate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> VacationResponse:
    """
    Endpoint to create a application type vacation

        params:
            - body: VacationCreate

        response:
            - Vacation
    """
    try:
        # En la BD de mongo
        vacation_create = await crud.vacation.create(
            db=engine,
            obj_in=Vacation(**dict(vacation))
        )

        # En la BD de PostgreSQL
        application = ApplicationCreate(
            mongo_id=str(vacation_create.id),
            application_sub_type_id=vacation.application_sub_type_id,
            user_id=current_user.id
        )

        application = crud.application.create(
            db=db,
            who=current_user,
            obj_in=application
        )
        
        application = ApplicationResponse.from_orm(application)
        
        response = VacationResponse(
            **dict(application, vacation=vacation_create))

    except BaseErrors as e:
        await engine.remove(Vacation, Vacation.id == vacation_create.id)
        log.error('BaseErrors')
        raise HTTPException(e.code, e.detail)

    except ValueError as e:
        log.error('ValueError')
        await engine.remove(Vacation, Vacation.id == vacation_create.id)
        raise HTTPException(422, e)

    except Exception as e:
        log.error('Exception')
        log.error(e)
        await engine.remove(Vacation, Vacation.id == vacation_create.id)
        raise HTTPException(422, "Algo ocurrió mal")

    return response