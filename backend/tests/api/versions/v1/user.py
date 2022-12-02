from fastapi.testclient import TestClient

from app.main import app
from app.core.logging import get_logging
from app.core.config import get_app_settings

log = get_logging(__name__)

settings = get_app_settings()

client = TestClient(app)

url = '/api/v1/user/'


def test_api_user():
    token = client.post(
        '/api/v1/login/access-token',
        data={
            "username": settings.first_superemployee_email,
            "password": settings.first_superemployee_password}
    ).json()['access_token']
    log.debug(token)
    user = {
        "last_names": "KRHWGMGVHOWW CCZXDCYOHFYH OLRXVIHEHIXDTIFEJGKZRRSD",
        "names": "JOUKWONLOUGKQUCZPGTQALAYF EEKWW MGYIELZAGUMNQHUUGD",
        "identification_number": "UZYRTUJDVMLL270C",
        "email": "test.api@udea.edu.co",
        "active": True,
        "scale": "string",
        "phone": "string",
        "office": "strin",
        "vinculation_type": "string",
        "department_id": 3,
        "rol_id": 9,
        "password": "string"
    }

    log.debug(token)

    response = client.post(
        url=url,
        json=user
    )

    log.debug(response.json())

    delete = client.delete(
        url=url+f"{response.json()['id']}", headers={'Authorization': f"Bearer {token}"})

    response2 = client.post(
        url=url,
        json=user
    )

    log.debug(delete.json())

    userget = client.get(
        url=url+str(1), headers={'Authorization': f"Bearer {token}"})

    log.debug(userget.json())

    assert response.status_code == 201
    assert delete.status_code == 200
    assert userget.json(
    )['names'] == settings.first_superemployee_names

    delete = client.delete(
        url=url+f"{response2.json()['id']}", headers={'Authorization': f"Bearer {token}"})
