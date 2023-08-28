from app.domain.policies.base import Base

from app.core.logging import get_logging

from app.domain.models.applications.economic_support import *
from app.domain.schemas.applications.economic_support import EconomicSupportCreate, EconomicSupportUpdate, EconomicSupportBase
from app.domain.models import Application_status, User, UserApplication, Status

from app.domain.errors.applications.economic_support import *

log = get_logging(__name__)
class EconomicSupportPolicy(Base[EconomicSupport, EconomicSupportCreate, EconomicSupportUpdate]):

    def create(self, who: User, application_sub_type_id):
        #Match student rols (pregraduated and postgraduated)
   
        if who.userrol[who.active_rol].rol.scope == 13 : #27 -> pregraduated
            if application_sub_type_id == 15 :
                raise economic_support_403
        
        return None
    
    #Check if the user(coordinador) can see the application
    def check_user(self, user_application: UserApplication) -> None:
        log.debug('dentro de check_user')
        
        if not (user_application.user_id and user_application.application_id):
            log.debug('entro a la policy')
            raise economic_support_401
        
        return None

    def compliment(self, economic_support: EconomicSupportBase) -> None:
        if not (economic_support.payment['end_date'] < datetime.now()):
            raise economic_support_compliment_403
        if economic_support.compliment is not None:
            raise economic_support_compliment_404
        return None
    
