from datetime import datetime

from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

from app.domain.models import Commission, User
from app.core.logging import get_logging
from ..templates import templates_dir

log = get_logging(__name__)

def resolution_generation(user: User, commission: Commission):
    env = Environment(loader=FileSystemLoader(templates_dir))
    data = {
        "image": "logo_2.png",
        "signature": "signature_2.png",
        "date": datetime.now().strftime('%Y/%m/%d'),
        "user": user.__dict__,
        "school": user.department.school.__dict__
    }