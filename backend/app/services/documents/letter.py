from os import path
from datetime import datetime

from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

templates_dir = path.dirname(__file__)

env = Environment(loader=FileSystemLoader(templates_dir))

user = {
        "names": "Simon de la rosa",
        "lastnames": "Garcia Lujan",
        "identification": "1001987844",
        "identification_type": "CC",
    }

school = {
        "description": "Facultad de ciencias exactas y naturales",
        "direction": "Ciudad Universitaria: Calle 67 N. o 53-108. Bloque 1, oficina 115 Recepción de correspondencia: Calle 70 N.o 52-21",
        "contact": "219 56 00 NIT: 890.980.040-8 Apartado: 1226",
        "website": "http://cienciasexactasynaturales.udea.edu.co/",
        "dean": "Adriana Echavarria",
    }



prueba_permiso = {
    "image": "logo_2.png",
    "signature": "signature_2.png",
    "date": datetime.now().strftime("%Y/%m/%d"),
    "user": user,
    "school": school,
    "permission": {
        "justification": "Con ganas de irme de paseo bien bueno a punta cana",
        "start_date": "fecha 1",
        "end_date": "fecha 2"
    },
    "application": {
        "application_sub_type": {
            "name": "Licencia tales de mileto"
        }
    }
}

prueba_comision = {
    "image": "logo_2.png",
    "signature": "signature_2.png",
    "consecutive": 10001,
    "user": user,
    "school": school,
    "commission": {
        "justification": "Con ganas de irme de paseo bien bueno a punta cana",
        "start_date": "fecha 1",
        "end_date": "fecha 2"
    },
    "application": {
        "application_sub_type": {
            "name": "Comision de servicios"
        }
    }
}

template1 = env.get_template("permission.letter.html")

render1 = template1.render(prueba_permiso)

with open("output.html", "wb") as file:
    file.write(render1.encode("utf-8"))

HTML(string=render1, base_url=templates_dir).write_pdf(target='output.pdf')

template2 = env.get_template("commission.letter.html")

render2 = template2.render(prueba_comision)

with open("output2.html", "wb") as file:
    file.write(render2.encode("utf-8"))

HTML(string=render2, base_url=templates_dir).write_pdf(target='output2.pdf')