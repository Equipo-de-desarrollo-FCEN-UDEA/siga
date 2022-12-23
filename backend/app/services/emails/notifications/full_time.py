import smtplib

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from ..templates import templatesdir
from app.core.celery_worker import celery
from app.core.config import get_app_settings
# import crontab 

settings = get_app_settings()

# Variables para el remitente del correo.
_my_email = settings.smtp_user_email
_my_pwd = settings.smtp_user_password._secret_value

env = Environment(loader=FileSystemLoader(templatesdir))


@celery.task
def partial_report(tipo_solicitud: str, observacion: str, nombre_estado: str, id: int, email: str):
    # template = env.get_template("email.cambio.estado.html.j2")
    # enlace = f"http://{settings.APP_DOMAIN}/solicitudes/ver/{id}/{tipo_solicitud.lower()}"
    # context = {
    #     'req': {'tiposolicitud': tipo_solicitud, 'body': {'observacion': observacion}},
    #     'estado': {'nombre': nombre_estado},
    #     'Enlace': enlace
    # }

    # render = template.render(context)
    # msg = EmailMessage()
    # msg["Subject"] = "Informe parcial | Dedicación exclusiva"
    # msg["From"] = _my_email
    # msg["To"] = email
    # msg.set_content(
    #     render,
    #     subtype="html"
    # )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)
