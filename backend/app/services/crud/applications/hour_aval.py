from odmantic import ObjectId
from odmantic.session import AIOSession

from app.domain.models import HourAval
from app.domain.schemas import HourAvalCreate, HourAvalUpdate
from app.domain.policies.applications.hour_aval import HourAvalPolicy
from .base import CRUDBase

class CRUDHourAval(CRUDBase[HourAval, HourAvalCreate, HourAvalUpdate, HourAvalPolicy]):
    async def confirm(db: AIOSession, id: ObjectId, email: str) -> None:
        hour_aval = await db.find_one(HourAval, HourAval.id == id)
        return None
policy = HourAvalPolicy()

hour_aval = CRUDHourAval(HourAval, HourAvalPolicy)