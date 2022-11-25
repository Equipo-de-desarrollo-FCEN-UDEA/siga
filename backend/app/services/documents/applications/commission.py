from datetime import datetime

from jinja2 import Environment, FileSystemLoader

from app.domain.models import Commission, User
from app.core.logging import get_logging
from ..templates import templates_dir

log = get_logging(__name__)

def resolution_generation(user: User, commission: Commission):
    log.debug(user.__dict__)
    log.debug(commission.__dict__)
    log.debug(templates_dir)