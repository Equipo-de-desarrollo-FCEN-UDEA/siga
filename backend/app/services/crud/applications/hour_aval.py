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
policy = HourAvalPolicy()

hour_aval = CRUDHourAval(HourAval, HourAvalPolicy)