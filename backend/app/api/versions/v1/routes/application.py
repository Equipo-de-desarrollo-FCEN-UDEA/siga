from typing import Any, List

from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.responses import JSONResponse
from odmantic.session import AIOSession

from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.domain import models, schemas
from app.domain.errors.base import BaseErrors
from app.services import crud, documents
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.services import aws
router = APIRouter()

log = get_logging(__name__)


@router.get("/", status_code=200,
            response_model=List[schemas.ApplicationMultiResponse])
async def read_applications(
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
    search: str | None = None,
    filed: bool | None = None,
    engine: AIOSession = Depends(mongo_db.get_mongo_db)
) -> Any:
    """
    Endpoint to read all applications.

        params: skip: int, limit: int
    """
    try:
        db_application = crud.application.get_multi(
            db=db, skip=skip, limit=limit, who=current_user, search=search, filed=filed)
        log.debug(len(db_application))
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_application


@router.get("/{id}", status_code=200,
            response_model=schemas.ApplicationResponse)
def read_application(
    id: int,
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user)
) -> schemas.ApplicationResponse:
    """
    Endpoint to read an application.

        params: id: int
    """
    try:
        db_application = crud.application.get(db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    return db_application


@router.delete("/{id}", status_code=200)
def delete_application(
    id: int,
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user)
) -> Any:
    """
    Endpoint to delete an application.

        params: id: int
    """
    try:
        db_obj = crud.application.get(db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    try:
        db_application = crud.application.delete(
            db=db, id=id, who=current_user)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return JSONResponse(status_code=status.HTTP_200_OK, content={
        'detail': 'application deleted'
    })


@router.post("/", response_model=schemas.ApplicationMultiResponse)
def get_application(
    application: schemas.ApplicationCreate,
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user)
) -> schemas.ApplicationMultiResponse:
    """
    Endpoint to create an application
    """
    try:
        db_obj = crud.application.create(db, current_user, obj_in=application)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_obj


@router.put("/{id}", response_model=schemas.ApplicationResponse)
def filed(
    id: int,
    *,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user
    )
) -> schemas.ApplicationResponse:
    """
    Endpoint to file an application
    """
    try:
        if not current_user.userrol[current_user.active_rol].rol.scope == 5:
            raise HTTPException(status_code=401, detail="Solo puede archivar la secretaria de decanato")
        db_obj = crud.application.get(db, current_user, id=id)
        db_obj.filed = not db_obj.filed
        db.commit()
        db.refresh(db_obj)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_obj


@router.post("/report")
def report(*,
    db: Session = Depends(db.get_db),
    current_user: schemas.UserInDB = Depends(
        jwt_bearer.get_current_active_user),
    skip: int = 0,
    limit: int = 100,
    search: str | None = None,
    filed: bool | None = None,
    engine: AIOSession = Depends(mongo_db.get_mongo_db)
) -> Any:
    """
    Endpoint to generate a report of applications.
        params: skip: int, limit: int
    """
    try:
        #Cambiar skip y limit para tomar todas las solicitudes.
        db_application = crud.application.get_all(
            db=db, skip=skip, limit=limit, who=current_user, search=search, filed=filed)
        #Verificar cómo se devuelve el reporte.
        report_path = documents.fill_report_applications(current_user, db_application)
        
        #report = aws.s3.get_data_from_s3_bucket(settings.aws_bucket_name, report_path)

        log.debug(report)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    
    return report_path