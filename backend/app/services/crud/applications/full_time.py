from typing import Any

from odmantic import ObjectId
from odmantic.session import AIOSession

from app.domain.models import FullTime
from app.domain.schemas import FullTimeUpdate, FullTimeCreate
from app.domain.policies.applications.full_time import FullTimePolicy
from .base import CRUDBase

class CRUDFullTime(CRUDBase[FullTime, FullTimeCreate, FullTimeUpdate, FullTimePolicy]):
    async def letter(self, db: AIOSession, *, id: ObjectId, letter: Any) -> FullTime:
        full_time = await db.find_one(FullTime, FullTime.id == id)
        full_time.initial_letter = letter
        db_obj = await db.save(full_time)
        return db_obj
    
    async def vice_format(self, db: AIOSession, *, id: ObjectId, vice_format: Any) -> FullTime:
        full_time = await db.find_one(FullTime, FullTime.id == id)
        full_time.vice_format = vice_format
        db_obj = await db.save(full_time)
        return db_obj
    
    async def work_plan(self, db: AIOSession, *, id: ObjectId, work_plan: Any) -> FullTime:
        full_time = await db.find_one(FullTime, FullTime.id == id)
        full_time.work_plan = work_plan
        db_obj = await db.save(full_time)
        return db_obj

policy = FullTimePolicy()

full_time = CRUDFullTime(FullTime, policy=policy)