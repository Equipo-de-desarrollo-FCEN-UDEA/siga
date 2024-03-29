import smtplib

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from .templates import templatesdir
from app.core.celery_worker import celery_app
from app.core.config import get_app_settings

settings = get_app_settings()

# Variables para el remitente del correo.
_my_email = settings.smtp_user_email
_my_pwd = settings.smtp_user_password._secret_value

env = Environment(loader=FileSystemLoader(templatesdir))


@celery_app.task
def update_status_email(tipo_solicitud: str, observacion: str, nombre_estado: str, id: int, email: list[str] | str):
    template = env.get_template("email.cambio.estado.html.j2")
    enlace = f"http://{settings.APP_DOMAIN}/solicitudes/ver/{id}/{tipo_solicitud.lower()}"
    context = {
        'req': {'tiposolicitud': tipo_solicitud, 'body': {'observacion': observacion}},
        'estado': {'nombre': nombre_estado},
        'Enlace': enlace
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Actualización de solicitud"
    msg["From"] = _my_email
    msg["To"] = ", ".join(email) if isinstance(email, list) else email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)

             # server de pruebas udea

    # with smtplib.SMTP("172.19.0.101", port=25) as smtp:
    #     smtp.send_message(msg=msg, from_addr=_my_email, to_addrs= email)



@celery_app.task
def create_application_email(to_name: str, to_lname: str, tipo_solicitud: str, token: str, email: str):
    template = env.get_template("email.creacion.solicitud.html.j2")

    context = {
        'user': {'nombre': to_name, 'apellido': to_lname},
        'req': {'tiposolicitud': tipo_solicitud},
        'Enlace': token
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Creación de solicitud"
    msg["From"] = _my_email
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)

         # server de pruebas udea

    # with smtplib.SMTP("172.19.0.101", port=25) as smtp:
    #     smtp.send_message(msg=msg, from_addr=_my_email, to_addrs= email)

