from jinja2 import Environment, FileSystemLoader

env = Environment(loader=FileSystemLoader('.'))
template = env.get_template('commission.letter.html.j2')

context = {
    "image": "logo.png",
    "consecutive": "123",
    "application": {
        "application_sub_type": {"name": "Comisión de Servicios"}
    },
    "school": {
        "description": "Facultad de Ingeniería",
        "dean": "Juan Pérez",
        "direction": "Calle 123",
        "contact": "decanato@ejemplo.edu.co"
    },
    "user": {
        "names": "Ana",
        "last_names": "Gómez",
        "identification_type": "CC",
        "identification_number": "12345678",
        "department": {"description": "Departamento de Sistemas"}
    },
    "commission": {
        "start_date": "2026-01-01",
        "end_date": "2026-01-10",
        "reason": "asistir a congreso",
        "country": "Colombia",
        "state": "Antioquia",
        "city": "Medellín"
    },
    "last_status": "22 de enero de 2026",
    "signature": "firma.png"
}

html = template.render(**context)
with open("output.html", "w") as f:
    f.write(html)