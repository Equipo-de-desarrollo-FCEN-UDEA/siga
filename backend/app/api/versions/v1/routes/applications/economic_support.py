from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.services import crud, emails
from app.domain.models import EconomicSupport, User, Application
from app.domain.schemas import (ApplicationCreate,
                                EconomicSupportCreate,
                                EconomicSupportUpdate,
                                EconomicSupportResponse,
                                ApplicationResponse,
                                Application_statusCreate)
from app.domain.errors import BaseErrors


router = APIRouter()

log = get_logging(__name__)

# crea una solicitud de apoyo económico
@router.post("/", response_model=EconomicSupportResponse)
async def create_economic_support(
    economic_supprt: EconomicSupportCreate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> EconomicSupportResponse:
    """
    Endpoint to create a application type economic support

        params:
            - body: EconomicSupportCreate

        response:
            - EconomicSupport
    """
    try:
        log.debug(economic_supprt)
        # En la BD de mongo
        economic_support_create = await crud.economic_support.create(
            db=engine,
            obj_in=EconomicSupport(**dict(economic_supprt))
        )

        # En la BD de PostgreSQL
        application = ApplicationCreate(
            mongo_id=str(economic_support_create.id),
            application_sub_type_id=economic_supprt.application_sub_type_id,
            user_id=current_user.id
        )

        application = crud.application.create(
            db=db,
            who=current_user,
            obj_in=application
        )

        
    except BaseErrors as e:
        await engine.remove(EconomicSupport, EconomicSupport.id == economic_support_create.id)
        log.error('BaseErrors')
        raise HTTPException(e.code, e.detail)

    except ValueError as e:
        log.error('ValueError')
        await engine.remove(EconomicSupport, EconomicSupport.id == economic_support_create.id)
        raise HTTPException(422, e)

    except Exception as e:
        log.error('Exception')
        log.error(e)
        await engine.remove(EconomicSupport, EconomicSupport.id == economic_support_create.id)
        raise HTTPException(422, "Algo ocurrió mal")
    
    application = ApplicationResponse.from_orm(application)

    response = EconomicSupportResponse(
            **dict(application, economic_support=economic_support_create))
    
    return response


