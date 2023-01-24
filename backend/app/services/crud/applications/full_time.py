from typing import Any
from json import loads

from odmantic import ObjectId
from odmantic.session import AIOSession

from app.domain.models import FullTime
from app.domain.schemas import FullTimeUpdate, FullTimeCreate, WorkPlan
from app.domain.policies.applications.full_time import FullTimePolicy
from .base import CRUDBase


class CRUDFullTime(CRUDBase[FullTime, FullTimeCreate, FullTimeUpdate, FullTimePolicy]):
    async def letter(self, db: AIOSession, *, id: ObjectId, letter: Any, path: str) -> FullTime:
        full_time = await db.find_one(FullTime, FullTime.id == id)
        full_time.initial_letter = letter
        for i, document in enumerate(full_time.documents):
            if document['name'] == 'carta-inicio.pdf':
                del full_time.documents[i]
        if full_time.documents is not None:
            full_time.documents += [{'name': 'carta-inicio.pdf', 'path': path}]
        else:
            full_time.documents = [{'name': 'carta-inicio.pdf', 'path': path}]
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


policy = FullTimePolicy()

full_time = CRUDFullTime(FullTime, policy=policy)
