# import smtplib
# from datetime import datetime 

# from jinja2 import Environment, FileSystemLoader
# from email.message import EmailMessage

# from .templates import templatesdir
# from app.core.celery_worker import celery_app
# from app.core.config import get_app_settings

# settings = get_app_settings()

# # Variables para el remitente del correo.
# _my_email = settings.smtp_user_email
# _my_pwd = settings.smtp_user_password._secret_value

# env = Environment(loader=FileSystemLoader(templatesdir))


# @celery_app.task
# def full_time_report(tipo_solicitud: str, send_date: datetime,  id: int, email: str):
#     template = env.get_template("email.report.full.time.html.j2")
#     url = f"http://{settings.APP_DOMAIN}/solicitudes/ver/{id}/{tipo_solicitud.lower()}"
#     context = {
#         'date': send_date,
#         'link': url
#     }

#     render = template.render(context)
#     msg = EmailMessage()
#     msg["Subject"] = "Informe | Dedicación exclusiva"
#     msg["From"] = _my_email
#     msg["To"] = email
#     msg.set_content(
#         render,
#         subtype="html"
#     )

#     with smtplib.SMTP_SSL("smtp.gmail.com", port=465) as smtp:
#         smtp.login(_my_email, _my_pwd)
#         smtp.send_message(msg)