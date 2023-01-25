from odmantic import ObjectId
from odmantic.session import AIOSession

from app.domain.models import HourAval
from app.domain.schemas import HourAvalCreate, HourAvalUpdate, HourAvalInDB
from app.domain.policies.applications.hour_aval import HourAvalPolicy
from .base import CRUDBase

class CRUDHourAval(CRUDBase[HourAval, HourAvalCreate, HourAvalUpdate, HourAvalPolicy]):
    async def confirm(self, db: AIOSession, id: ObjectId, email: str, acepted: bool) -> None:
        hour_aval = await db.find_one(HourAval, HourAval.id == id)
        hour_aval_aux = HourAvalInDB(**dict(hour_aval))
        for i, applicant in enumerate(hour_aval_aux.another_applicants):
            if applicant.email == email:
                hour_aval.another_applicants[i].acepted = acepted
        hour_aval = await db.save(hour_aval)
        return hour_aval

    async def update_document(self, db:AIOSession, *, id: ObjectId, name: str, path: str) -> None:
        hour_aval = await db.find_one(HourAval, HourAval.id == id)
        if hour_aval.documents is not None:
            for i, document in enumerate(hour_aval.documents):
                if document['name'] == name:
                    del hour_aval.documents[i]
        if hour_aval.documents is not None:
            hour_aval.documents += [{'name': name, 'path': path}]
        else:
            hour_aval.documents = [{'name': name, 'path': path}]
        await db.save(hour_aval)
        return None
policy = HourAvalPolicy()

hour_aval = CRUDHourAval(HourAval, HourAvalPolicy)