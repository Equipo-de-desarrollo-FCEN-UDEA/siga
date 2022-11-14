from app.domain.models import Permission
from app.domain.schemas import PermissionUpdate
from .base import CRUDBase

class CRUDPermission(CRUDBase[Permission, PermissionUpdate]):
    
    # def create(
    #     self,
    #     db: Session,
    #     obj_in: UserCreate
    # ) -> User:
    #     user: User = self.get_by_identification(
    #         db, identification=obj_in.identificaction_number) or self.get_by_email(db=db, email=obj_in.email)
    #     self.policy.create(to=user)
    #     hashed_password = get_password_hash(obj_in.password)
    #     data = dict(obj_in)
    #     del data['password']
    #     data['hashed_password'] = hashed_password
    #     db_obj = User(**data)
    #     self.policy.create(to=user)
    #     db.add(db_obj)
    #     db.commit()
    #     db.refresh(db_obj)
    #     return db_obj

    pass

permission = CRUDPermission(Permission)