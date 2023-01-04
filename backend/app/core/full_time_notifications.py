# from typing import Any, List
# from datetime import datetime

# from fastapi import Depends
# from sqlalchemy.orm import Session
# from app.api.middlewares import db

# from app.domain.models import CronJob

# from app.core.logging import get_logging

# from app.core import tasks

# log = get_logging(__name__)

# def get_multi() -> None:

#     database = Depends(db.get_db)
#     today = datetime.now()

#     log.debug('today', today)

#     # Busca en cronjob todos mensajes que se deben enviar ese dia
#     db_objs = database.\
#         query(CronJob).\
#         filter(CronJob.send_date == today).\
#         all() 
    
#     #todo id cambiarlo y agergarlo al modelo
#     tasks.full_time_notifications(tipo_solicitud='dedicacion', send_date=today, id=db_objs.id, email=db_objs.email)

