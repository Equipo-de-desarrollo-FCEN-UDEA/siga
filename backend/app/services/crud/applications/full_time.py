from typing import Any, Dict, List
from json import loads

from odmantic import ObjectId
from odmantic.session import AIOSession

from app.domain.models import FullTime, User
from app.domain.schemas import FullTimeUpdate, FullTimeCreate, WorkPlan, UserInDB
from app.domain.policies.applications.full_time import FullTimePolicy
from .base import CRUDBase


class CRUDFullTime(CRUDBase[FullTime, FullTimeCreate, FullTimeUpdate, FullTimePolicy]):
    async def get_multi(
    self,
    engine: AIOSession,
    who: UserInDB,
    *,
    skip: int = 0,
    limit: int = 20,
) -> List[FullTime]:
        db_full_time = []
        db_full_time = engine.find(FullTime, skip=skip, limit=limit)
        return db_full_time


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

    async def work_plan(self, db: AIOSession, *, id: ObjectId, work_plan: WorkPlan) -> FullTime:
        full_time = await db.find_one(FullTime, FullTime.id == id)
        full_time.work_plan = loads(work_plan.json(exclude_unset=True))
        db_obj = await db.save(full_time)
        return db_obj

    async def update_document(self, db:AIOSession, *, id: ObjectId, name: str, path: str) -> None:
        full_time = await db.find_one(FullTime, FullTime.id == id)
        for i, document in enumerate(full_time.documents):
            if document['name'] == name:
                del full_time.documents[i]
        if full_time.documents is not None:
            full_time.documents += [{'name': name, 'path': path}]
        else:
            full_time.documents = [{'name': name, 'path': path}]
        await db.save(full_time)
        return None


policy = FullTimePolicy()

full_time = CRUDFullTime(FullTime, policy=policy)
