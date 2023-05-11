from app.domain.policies.base import Base

from app.domain.models.applications.economic_support import *
from app.domain.schemas.applications.economic_support import EconomicSupportCreate, EconomicSupportUpdate
from app.domain.models import Application_status, User, Application, Status

from app.domain.errors.applications.economic_support import *

from app.core.logging import get_logging



log = get_logging(__name__)
class EconomicSupportPolicy(Base[EconomicSupport, EconomicSupportCreate, EconomicSupportUpdate]):
    # pass

    def create(self, who: User, to: Application) -> tuple[str, str]:
        #Match student rols (pregraduated and postgraduated)
        accept_support = to.application_sub_type_id

        if who.rol.scope == 13 : #27 -> pregraduated
            if accept_support == 15 :
                raise EconomicSupportErrors(
                    403, detail=f"No tiene permitido pedir un apoyo económico a Posgrado siendo de pregrado")
        
        return 
    