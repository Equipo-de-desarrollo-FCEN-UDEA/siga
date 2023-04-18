from typing import Any

from odmantic import ObjectId
from odmantic.session import AIOSession

from app.core.logging import get_logging

from  app.domain.models import Vacation
from  app.domain.schemas import VacationCreate, VacationUpdate 
from  app.domain.policies.applications.vacation import VacationPolicy

from .base import CRUDBase

log = get_logging(__name__)

class CRUDVacation(CRUDBase[Vacation, VacationCreate, VacationUpdate, VacationPolicy]):
    async def create_format(self, db: AIOSession, *, id: ObjectId, name: str, path: str) -> None:
        vacation = await db.find_one(Vacation, Vacation.id == id)
        log.debug(vacation.dict())
        for i, document in enumerate(vacation.documents):
            if document['name'] == name:
                del vacation.documents[i]
        if vacation.documents is not None:
            vacation.documents += [{'name': name, 'path': path}]
        else:
            vacation.documents = [{'name': name, 'path': path}]
        await db.save(vacation)
        return None

policy   = VacationPolicy()
vacation = CRUDVacation(Vacation, policy=policy)
