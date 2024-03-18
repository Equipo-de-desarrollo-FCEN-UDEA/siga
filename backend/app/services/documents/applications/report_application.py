import json
from datetime import datetime
from uuid import uuid1
from io import BytesIO
from tempfile import NamedTemporaryFile

from openpyxl import load_workbook

from app.domain.models import User, Application
from app.domain.schemas import UserResponse
from app.domain.schemas.application import ApplicationResponse
from ..templates import templates_dir
from app.core.config import get_app_settings
from app.core.logging import get_logging
from app.core.celery_worker import celery_app
from app.services import aws

settings = get_app_settings()
log = get_logging(__name__)

def fill_report_applications(user: User, applications: list[Application]):
    user: dict = UserResponse.from_orm(user).dict()
    
    applications_list = []
    for application in applications:
        application: dict = ApplicationResponse.from_orm(application).dict()
        data_application = {
            'id': application['id'],
            'application_type': application['application_sub_type']['name'],
            'status': application['application_status'][0]['status']['name'],
            'creation_date': application['created_at'],
            'names': application['user']['names'],
            'last_names': application['user']['last_names'],
            'department': application['user']['department']['name'],
            'school': application['user']['department']['school']['name']
        }
        applications_list.append(data_application)

    path = f'user_{user["id"]}/{uuid1()}' + 'formato_reporte_solicitudes.xlsx'
    generate_report_format_to_aws.apply_async(args=(applications_list, path))

    return path


@celery_app.task 
def generate_report_format_to_aws(applications: list[dict], path: str):

    cells = open(templates_dir + '/cells_report.json')
    cells = json.load(cells)

    wb = load_workbook(filename=templates_dir + '/Reporte_solicitudes_SIGA.xlsx')
    target = wb.active

    for i, application in enumerate(applications):
        idx = cells['index'] + i
        for key in application.keys():
            target[cells[key] + str(idx)] = application[key]
    
    with NamedTemporaryFile() as tmp:
        wb.save(tmp.name)
        file = BytesIO(tmp.read())

    aws.s3.push_data_to_s3_bucket(settings.aws_bucket_name, file, file_name=path, content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
