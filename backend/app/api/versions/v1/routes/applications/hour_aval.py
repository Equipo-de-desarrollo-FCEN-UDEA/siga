from typing import Callable
from functools import partial

from fastapi import APIRouter, Depends, HTTPException
from odmantic import ObjectId
from odmantic.session import AIOSession
from sqlalchemy.orm import Session

from app.api.middlewares import mongo_db, db, jwt_bearer
from app.core.logging import get_logging
from app.services import crud, emails, security, documents
from app.domain.models import HourAval, User, Application, Application_status
from app.domain.schemas import (ApplicationCreate,
                                HourAvalCreate,
                                HourAvalUpdate,
                                HourAvalInDB,
                                Msg,
                                HourAvalResponse,
                                ApplicationResponse,
                                Application_statusCreate,
                                UserResponse,
                                Act
                                )
from app.domain.errors import BaseErrors


router = APIRouter()

log = get_logging(__name__)


@router.post("/", response_model=HourAvalResponse)
async def create_hour_aval(
    hour_aval: HourAvalCreate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> HourAvalResponse:
    """
    Endpoint to create a application type hour_aval

        params:
            - body: hour_avalCreate

        response:
            - hour_aval
    """
    try:
        hour_aval_created = await crud.hour_aval.create(db=engine,
                                                        obj_in=HourAval(**dict(hour_aval)))
        application = ApplicationCreate(
            mongo_id=str(hour_aval_created.id),
            application_sub_type_id=hour_aval.application_sub_type_id,
            user_id=current_user.id
        )
        if not hour_aval.another_applicants:
            application = crud.application.create(
                db, current_user, application)
            path = documents.hour_aval_letter_generation(
                current_user, hour_aval_created, [])
            await crud.hour_aval.update_document(engine, id=hour_aval_created.id, name='carta-aval.pdf', path=path)
        else:
            application = crud.application.create(
                db, current_user, application, status=6, observation='Solicitud a la espera de confirmación otros profesores')
        if current_user.vinculation_type.upper() != 'PROFESOR VINCULADO':
            if hour_aval.backrest:
                pass
                # raise NotImplementedError
            else:
                raise HTTPException(
                    403, 'Usted no se encuentra registrado como profesor vinculado, debe agregar un respaldo a la solicitud')

        for applicant in hour_aval.another_applicants:
            token = security.jwt.hour_aval_token(
                applicant.email)
            user = crud.user.get_by_email(
                db, applicant.email) or crud.user.get_by_identification(db, applicant.email)
            emails.hours_aval_email.apply_async(
                args=(hour_aval.dict(), applicant.dict(), user.email, str(hour_aval_created.id), token))
    except BaseErrors as e:
        if hour_aval_created:
            await engine.remove(HourAval, HourAval.id == hour_aval_created.id)
        raise HTTPException(e.code, e.detail)
    except ValueError as e:
        if hour_aval_created:
            await engine.remove(HourAval, HourAval.id == hour_aval_created.id)
        raise HTTPException(422, e)
    application = ApplicationResponse.from_orm(application)
    response = HourAvalResponse(
        **dict(application),
        hour_aval=hour_aval_created
    )
    return response


@router.get("/", response_model=list[HourAval])
async def get_hour_avals(*,
                         engine: AIOSession = Depends(mongo_db.get_mongo_db)) -> list[HourAval]:

    hour_avales = await engine.find(HourAval)
    return hour_avales


@router.get("/{id}", response_model=HourAvalResponse)
async def get_hour_aval(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> HourAvalResponse:
    """
    Endpoint to ger a hour_aval model from mongo

        path-params:
            -id: int, this is the id of the application, not of mongo

        response:
            -body: hour_aval
    """
    try:
        application = crud.application.get(db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        if application:
            hour_aval = await crud.hour_aval.get(engine, id=mongo_id)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    application_response = ApplicationResponse.from_orm(application)
    response = HourAvalResponse(
        **dict(application_response),
        hour_aval=hour_aval
    )
    return response


@router.put("/{id}", status_code=200)
async def update_hour_aval(
    id: int,
    hour_aval: HourAvalUpdate,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> HourAval:
    """
    Endpoint to update an application of type hour_aval

        params:
            -body: hour_avalUpdate

        path-params:
            -id: int, this is the id of the application and not the mongo_id

        response:
            -body: hour_aval
    """

    try:
        # GET In PostgreSQL
        application: Application = crud.application.get(
            db=db, id=id, who=current_user)

        if application:

            # In MongoDB
            mongo_id = ObjectId(application.mongo_id)

            current_hour_aval = await crud.hour_aval.get(engine, id=mongo_id)

            updated_hour_aval = await crud.hour_aval.update(engine, db_obj=current_hour_aval, obj_in=hour_aval)

            if not hour_aval.another_applicants:
                application = crud.application.update(
                    db, current_user, db_obj=application, obj_in={})
                path = documents.hour_aval_letter_generation(
                    current_user, updated_hour_aval, [])
                await crud.hour_aval.update_document(engine, id=updated_hour_aval.id, name='carta-aval.pdf', path=path)
            else:
                application = crud.application.update(
                    db, current_user, db_obj=application, obj_in={}, status=6, observation='Solicitud a la espera de confirmación otros profesores')
            if current_user.vinculation_type.upper() != 'PROFESOR VINCULADO':
                if hour_aval.backrest:
                    pass
                    # raise NotImplementedError
                else:
                    raise HTTPException(
                        403, 'Usted no se encuentra registrado como profesor vinculado, debe agregar un respaldo a la solicitud')

            for applicant in hour_aval.another_applicants:
                if not applicant.acepted:
                    token = security.jwt.hour_aval_token(
                        applicant.email)
                    user = crud.user.get_by_email(
                        db, applicant.email) or crud.user.get_by_identification(db, applicant.email)
                    emails.hours_aval_email.apply_async(
                        args=(hour_aval.dict(), applicant.dict(), user.email, str(updated_hour_aval.id), token))

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)

    return updated_hour_aval


@router.delete("/{id}", response_model=Msg)
async def delete_hour_aval(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Msg:
    """
    Endpoint to delete an application of type hour_aval

        params:
            -id: int, this is the id of the application and not of mongo

        response:
            -msg: Msg
    """
    try:
        # First get the application from postgresql
        application = crud.application.get(db, current_user, id=id)
        # get id from the model sql
        mongo_id = ObjectId(application.mongo_id)
        # Delete object in postgresql
        delete = crud.application.delete(db, current_user, id=id)
        if delete:
            # delete object on Mongo
            await crud.hour_aval.delete(engine, id=mongo_id)

    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return Msg(msg="Comisión eliminada correctamente")


@router.put('/{mongo_id}/confirm/', response_model=Msg)
async def confirm_user(
    mongo_id: str,
    acepted: bool,
    token: str,
    *,
    engine: AIOSession = Depends(mongo_db.get_mongo_db)
) -> Msg:
    try:
        email = security.jwt.decode_token(token).sub
        mongo_id = ObjectId(mongo_id)
        hour_aval = await crud.hour_aval.confirm(engine, mongo_id, email, acepted)
    except Exception as e:
        raise HTTPException(500, str(e))
    response = 'aceptó' if acepted else 'rechazó'
    return {
        'msg':
        f'Su participación se {response} correctamente'
    }


@router.put('/{id}/generate/', response_model=Msg)
async def generate_letter(
    id: int,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Msg:
    try:
        application = crud.application.get(db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        hour_aval = await crud.hour_aval.get(engine, id=mongo_id)
        emails = list(map(lambda x: x.email, hour_aval.another_applicants))
        users = [
            UserResponse.from_orm(crud.user.get_by_email(
                db, email) or crud.user.get_by_identification(db, email)).dict()
            for email in emails
        ]
        application_status = Application_statusCreate(
            application_id=id,
            status_id=1,
            observation='Usuario generó carta'
        )
        crud.application.update(db, current_user, db_obj=application, obj_in={})
        path = documents.hour_aval_letter_generation(
            current_user, hour_aval, users)
        await crud.hour_aval.update_document(engine, id=mongo_id, name='carta-aval.pdf', path=path)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return {
        'msg':
        f'Su carta se generó correctamente'
    }


@router.put('/{id}/act', response_model=Msg)
async def generate_act(
    id: int,
    act: Act,
    *,
    current_user: User = Depends(jwt_bearer.get_current_active_user),
    engine: AIOSession = Depends(mongo_db.get_mongo_db),
    db: Session = Depends(db.get_db)
) -> Msg:
    try:
        application = crud.application.get(db, current_user, id=id)
        mongo_id = ObjectId(application.mongo_id)
        hour_aval = await crud.hour_aval.get(engine, id=mongo_id)
        user = crud.user.get(db, current_user, id=application.user_id)
        user = UserResponse.from_orm(user)
        hour_aval = HourAvalInDB(**hour_aval.dict())
        users = []
        backres = []
        if hour_aval.backrest:
            back = crud.user.get_by_email(db, hour_aval.backrest)
            backres += [
                {'user': (user.names + ' ' + user.last_names).title(),
                 'backres': (back.names + ' ' + back.last_names).title()
                 }]
        for applicant in hour_aval.another_applicants:
            user_applicant = UserResponse.from_orm(crud.user.get_by_email(
                db, applicant.email) or crud.user.get_by_identification(db, applicant.email))
            users += [user_applicant.dict()]
            if applicant.backrest and applicant.acepted:
                back = crud.user.get_by_email(db, applicant.backrest)
                backres += [
                    {'user': (user_applicant.names + ' ' + user_applicant.last_names).title(),
                     'backres': (back.names + ' ' + back.last_names).title()
                     }]
        if current_user.userrol[current_user.active_rol].rol.scope in [6, 7]:
            path = documents.hour_aval_act_generation(
                user, hour_aval, act, users, backres, 'houraval.act.department.html.j2')
            await crud.hour_aval.update_document(engine, id=mongo_id, name='aval-instituto.pdf', path=path)
        elif current_user.userrol[current_user.active_rol].rol.scope == 5:
            path = documents.hour_aval_act_generation(
                user, hour_aval, act, users, backres, 'houraval.act.school.html.j2')
            await crud.hour_aval.update_document(engine, id=mongo_id, name='aval-facultad.pdf', path=path)
    except BaseErrors as e:
        raise HTTPException(e.code, e.detail)
    return {
        'msg':
        f'El acta se generó correctamente'
    }
