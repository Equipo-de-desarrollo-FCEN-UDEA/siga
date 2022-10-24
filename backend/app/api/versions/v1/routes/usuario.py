from typing import Any, Dict, List, Union

from fastapi import APIRouter, Depends, status, HTTPException, Body
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from sqlalchemy.orm import Session

from app.api.middlewares import db, jwt_bearer
from app.domain import models, schemas
from app.domain.schemas.errors.base import BaseErrors
from app.services import crud
from app.core.logging import get_logging

router = APIRouter()

log = get_logging(__name__)


@router.post("/",
             status_code=201,
             response_model=schemas.UsuarioResponse
             )
def create_usuario(
    *,
    db: Session = Depends(db.get_db),
    super_usuario: models.Usuario = Depends(
        jwt_bearer.get_current_active_superusuario),
    usuario: schemas.UsuarioCreate
) -> Any:
    """
    Endpoint to create a new usuario.

        params: usuario: UsuarioCreate
    """
    try:
        db_usuario = crud.usuario.create(
            db=db, obj_in=usuario, who=super_usuario)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    except KeyError as e:
        HTTPException(status_code=422, detail=str(e))
    except ValueError as e:
        HTTPException(status_code=422, detail=str(e))
    log.debug(db_usuario.__dict__)
    return db_usuario


@router.get("/", status_code=200, response_model=List[schemas.UsuarioResponse])
def read_usuarios(
    *,
    db: Session = Depends(db.get_db),
    super_usuario: schemas.UsuarioInDB = Depends(
        jwt_bearer.get_current_active_superusuario),
    skip: int = 0,
    limit: int = 100,
    search: str | None = '',
    activo: bool | None = True,
) -> Any:
    """
    Endpoint to read all usuarios.

        params: skip: int, limit: int
    """
    try:
        db_usuario = crud.usuario.get_multi(
            db=db, skip=skip, limit=limit, who=super_usuario, search=search, activo=activo)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return db_usuario


@router.get("/{id}", status_code=200, response_model=schemas.UsuarioResponse)
def read_usuario(
    *,
    db: Session = Depends(db.get_db),
    current_usuario: schemas.UsuarioInDB = Depends(
        jwt_bearer.get_current_active_usuario),
    id: int
) -> schemas.UsuarioResponse:
    """
    Endpoint to read an usuario.

        params: id: int
    """
    try:
        if id == 0:
            return current_usuario

        db_usuario = crud.usuario.get(db=db, id=id, who=current_usuario)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    return db_usuario


@router.put("/{id}", status_code=200, response_model=schemas.UsuarioResponse)
def update_usuario(
    *,
    db: Session = Depends(db.get_db),
    current_usuario: schemas.UsuarioInDB = Depends(
        jwt_bearer.get_current_active_superusuario),
    usuario_in: Union[schemas.UsuarioUpdate, Dict[str,Any]],
    id: int
) -> schemas.UsuarioResponse:
    """
    Endpoint to update an usuario.
    """
    try:
        usuario = crud.usuario.get(db=db, id=id, who=current_usuario)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    return crud.usuario.update(db=db, db_obj=usuario, obj_in=usuario_in, who=current_usuario)


@router.put("/{id}/new-password", status_code=200, response_model=schemas.UsuarioResponse)
def update_usuario_password(
    *,
    db: Session = Depends(db.get_db),
    current_usuario: schemas.UsuarioInDB = Depends(
        jwt_bearer.get_current_active_superusuario),
    password: str,
    confirmpassword: str,
    id: int
) -> schemas.UsuarioResponse:
    """
    Endpoint to update an usuario.
    """
    try:
        usuario = crud.usuario.get(db=db, id=id, who=current_usuario)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    return crud.usuario.update_password(
        db=db, db_obj=usuario, password=password, confirmPassword=confirmpassword, who=current_usuario
    )


@router.delete("/{id}", status_code=200)
def delete_usuario(
    *,
    db: Session = Depends(db.get_db),
    current_usuario: schemas.UsuarioInDB = Depends(
        jwt_bearer.get_current_active_usuario),
    id: int
) -> Any:
    """
    Endpoint to delete an usuario.

        params: id: int
    """
    try:
        db_obj = crud.usuario.get(db=db, id=id, who=current_usuario)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)

    try:
        db_usuario = crud.usuario.delete(db=db, id=id, who=current_usuario)
    except BaseErrors as e:
        raise HTTPException(status_code=e.code, detail=e.detail)
    return JSONResponse(status_code=status.HTTP_200_OK, content={
        'detail': 'Usuario deleted'
    })
