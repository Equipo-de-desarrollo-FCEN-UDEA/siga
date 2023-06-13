from .base import CRUDBase

from sqlalchemy.orm import Session

#Modelos
from app.domain.models import Application, UserApplication, User
from app.domain.schemas import UserApplicationCreate, UserApplicationUpdate
from app.domain.policies import UserApplicationPolicy

from app.core.logging import get_logging

log = get_logging(__name__)
class CRUDUserApplication(CRUDBase[UserApplication, UserApplicationCreate, UserApplicationUpdate, UserApplicationPolicy]):
        
    def create(
                self, 
                db: Session, 
                who: User, *, 
                obj_in: UserApplicationCreate, 
                application: Application) -> UserApplicationCreate:
        obj_in_data = dict(obj_in)
        log.debug(obj_in_data)
    # def search_user_application(
    #                             self, 
    #                             db: Session, 
    #                             who: User,  
    #                             obj_in: UserApplication, 
    #                             application: Application):
    #     log.debug('search_user_application')
    #     query = (
    #         db
    #         .query(application)
    #         .join(obj_in)
    #         .join(who)
    #         .filter(obj_in.user_id == who.id)
    #         .all()
    #     )

    #     log.debug(query)

    #     return query
policy = UserApplicationPolicy()
user_application = CRUDUserApplication(UserApplication, policy=UserApplicationPolicy())