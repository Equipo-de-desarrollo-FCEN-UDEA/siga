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
    async def create_format(self, db: AIOSession, *, id: ObjectId, name: int, path: str) -> None:
        vacation = await db.find_one(Vacation, Vacation.id == id)
        if vacation is None:
            log.error("Vacation not found with id: %s", id)
            return None
        
        if not isinstance(vacation.documents, list):
            log.error("Documents is not a list: %s", vacation.documents)
            return None

        log.debug(vacation.dict())
        log.debug("ESTE NO ES")
        
        documents = vacation.documents[:]  # Make a copy of the list to avoid issues while deleting items
        for document in documents:
            if not isinstance(document, dict):
                log.error("Document is not a dictionary: %s", document)
                continue
            
            if document.get('name') == name:
                vacation.documents.remove(document)  # Remove the matching document
        
        vacation.documents.append({'name': name, 'path': path})  # Add the new document
        await db.save(vacation)
        return None

policy   = VacationPolicy()
vacation = CRUDVacation(Vacation, policy=policy)
