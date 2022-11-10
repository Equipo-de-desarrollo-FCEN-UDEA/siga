# from fastapi.testclient import TestClient
# from pytest import mark

# from app.main import app
# from app.core.logging import get_logging
# from app.core.config import get_app_settings

# log = get_logging(__name__)

# settings = get_app_settings()

# client = TestClient(app)

# url = '/api/v1/commission/'


# def test_api_commission():
#     token = client.post(
#         '/api/v1/login/access-token',
#         data={
#             "username": "9876543211",
#             "password": "123"}
#     ).json()['access_token']
#     log.debug(token)

#     commission = {
#         "country": "string",
#         "state": "string",
#         "city": "string",
#         "start_date": "2022-11-09T17:44:36.527Z",
#         "end_date": "2022-11-09T17:44:36.527Z",
#         "lenguage": "string",
#         "justification": "string",
#         "application_sub_type_id": 9
#     }

#     commission_update = {
#         "country": "string",
#         "state": "string",
#         "city": "string",
#         "start_date": "2022-11-09T17:44:36.527Z",
#         "end_date": "2022-11-09T17:44:36.527Z",
#         "lenguage": "string",
#         "justification": "Actualizado",
#         "application_sub_type_id": 9
#     }

#     response_post = client.post(url=url, json=commission, headers={
#         'Authorization': f"Bearer {token}"})

#     response_id = response_post.json()["id"]

#     response_get = client.get(
#         url=url+response_id, headers={'Authorization': f"Bearer {token}"})

#     response_put = client.put(url=url+response_id, json=commission_update,
#                               headers={"Autorization": f"Bearer {token}"})

#     response_delete = client.put(
#         url=url+response_id, headers={'Authorization': f"Bearer {token}"})

#     assert response_post.status_code == 200
