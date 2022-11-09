from typing import List
from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from odmantic.session import AIOSession
from odmantic import Model, ObjectId

from app.api.middlewares import mongo_db


class Permiso(Model):
    date_start: datetime
    date_end: datetime
    justification: str
    documents: list[str] | None


app = APIRouter()


@app.put("/Permisos/", response_model=Permiso)
async def create_Permiso(Permiso: Permiso, *, engine: AIOSession = Depends(mongo_db.get_mongo_db)):
    # await engine.start()
    await engine.save(Permiso)
    return Permiso


@ app.get("/Permisos/", response_model=List[Permiso])
async def get_Permisos(*, engine: AIOSession = Depends(mongo_db.get_mongo_db)):
    # await engine.start()
    Permisos = await engine.find(Permiso)
    return Permisos


@ app.get("/Permisos/count", response_model=int)
async def count_Permisos(*, engine: AIOSession = Depends(mongo_db.get_mongo_db)):
    # await engine.start()
    count = await engine.count(Permiso)
    return count


@ app.get("/Permisos/{id}", response_model=Permiso)
async def get_Permiso_by_id(id: ObjectId, *, engine: AIOSession = Depends(mongo_db.get_mongo_db)):
    # await engine.start()
    Permiso = await engine.find_one(Permiso, Permiso.id == id)
    if Permiso is None:
        raise HTTPException(404)
    return Permiso
