from typing import List

from fastapi import APIRouter, Depends, HTTPException
from odmantic.session import AIOSession
from odmantic import Model, ObjectId

from app.api.middlewares import mongo_db


class Tree(Model):
    name: str
    average_size: float
    discovery_year: int


app = APIRouter()


@app.put("/trees/", response_model=Tree)
async def create_tree(tree: Tree, *, engine: AIOSession = Depends(mongo_db.get_mongo_db)):
    # await engine.start()
    await engine.save(tree)
    return tree


@ app.get("/trees/", response_model=List[Tree])
async def get_trees(*, engine: AIOSession = Depends(mongo_db.get_mongo_db)):
    # await engine.start()
    trees = await engine.find(Tree)
    return trees


@ app.get("/trees/count", response_model=int)
async def count_trees(*, engine: AIOSession = Depends(mongo_db.get_mongo_db)):
    # await engine.start()
    count = await engine.count(Tree)
    return count


@ app.get("/trees/{id}", response_model=Tree)
async def get_tree_by_id(id: ObjectId, *, engine: AIOSession = Depends(mongo_db.get_mongo_db)):
    # await engine.start()
    tree = await engine.find_one(Tree, Tree.id == id)
    if tree is None:
        raise HTTPException(404)
    return tree
