from datetime import datetime
from odmantic import Model

class CronJob(Model):
    send_date: datetime
    template: str
    user_email: str
    
    