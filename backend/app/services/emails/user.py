import smtplib
from typing import Dict, Any

from jinja2 import Environment, FileSystemLoader
from email.message import EmailMessage

from .templates import templatesdir
from app.core.celery_worker import celery
from app.domain.models import User

#Variables para el remitente del correo.
_my_email = 'aplicacioncomisionesfcen@udea.edu.co'
_my_pwd = 'gstyjqgrmvbglbqh'

env = Environment(loader=FileSystemLoader(templatesdir))


@celery.task
def recovery_password_email(to_name: str, token: str, email: str):
    template = env.get_template('email.recuperar.contraseña.html')

    context = {
    'user':{'nombre':to_name},
    'Enlace':token
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Recuperación de contraseña"
    msg["From"] = _my_email
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)

@celery.task
def confirm_email(to_name: str, token: str, email: str):
    template = env.get_template('email.validar.email.html')

    context = {
    'user':{'nombre':to_name},
    'Enlace':token
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Confirmación correo"
    msg["From"] = _my_email
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)

@celery.task
def acomplish_email(to_name: str, to_lname: str, acompl: str, token: str, email: str):
    template = env.get_template("email.envio.cumplido.html")

    context = {
    'user':{'nombre':to_name, 'apellido':to_lname},
    'cumplido':acompl,
    'Enlace':token
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Envío de cumplido"
    msg["From"] = _my_email
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)

@celery.task
def update_status_email(tipo_solicitud: str, observacion: str, nombre_estado: str, token: str, email: str):
    template = env.get_template("email.cambio.estado.html")

    context = {
    'req':{'tiposolicitud':tipo_solicitud, 'body':{'observacion':observacion}},
    'estado':{'nombre':nombre_estado},
    'Enlace':token
    }

    render = template.render(context)
    msg = EmailMessage()
    msg["Subject"] = "Actualización de solicitud"
    msg["From"] = _my_email
    msg["To"] = email
    msg.set_content(
        render,
        subtype="html"
    )

    with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
        smtp.login(_my_email, _my_pwd)
        smtp.send_message(msg)

@celery.task
def create_application_email(to_name: str, to_lname: str, tipo_solicitud: str, token: str, email: str):
    template = env.get_template("email.creacion.solicitud.html")

    context = {
    'user':{'nombre':to_name, 'apellido':to_lname},
    'req':{'tiposolicitud':tipo_solicitud},
    'Enlace':token
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