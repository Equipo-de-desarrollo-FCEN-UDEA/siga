from datetime import datetime
from http.client import HTTPException

from fastapi.testclient import TestClient
from pytest import raises

from app.main import app
from app.core.logging import get_logging
from app.core.config import get_app_settings
from app.domain.schemas import Token

log = get_logging(__name__)

settings = get_app_settings()

client = TestClient(app)

url = '/api/v1/usuario/'


def test_api_usuario():
    token = client.post(
        '/api/v1/login/access-token',
        data={
            "username": settings.first_superemployee_numeroidentificacion,
            "password": settings.first_superemployee_password}
    ).json()['access_token']
    usuario = {
        "primerApellido": "RTPXRRDAVMPT",
        "segundoApellido": "MKWBYCBBZJNU",
        "primerNombre": "HLJXJTFIOSWHY",
        "otrosNombres": "WRVLJQXXXTDNSTVC",
        "pais": "KPQE",
        "numeroIdentificacion": "Lvy9eCRmc-2QSHKiFLkE",
        "fechaIngreso": "2022-10-16T01:12:21.251Z",
        "area_id": 1
    }

    log.debug(token)

    response = client.post(
        url=url,
        json=usuario,
        headers={'Authorization': f"Bearer {token}"}
    )

    log.debug(response.json())

    delete = client.delete(
        url=url+f"{response.json()['id']}", headers={'Authorization': f"Bearer {token}"})

    response2 = client.post(
        url=url,
        json=usuario,
        headers={'Authorization': f"Bearer FakeToken"}
    )

    log.debug(delete.json())

    usuarioget = client.get(
        url=url+str(1), headers={'Authorization': f"Bearer {token}"})

    log.debug(usuarioget.json())

    assert response.status_code == 201
    assert response2.status_code == 403
    assert delete.status_code == 200
    assert usuarioget.json(
    )['primerNombre'] == settings.first_superemployee_primernombre
