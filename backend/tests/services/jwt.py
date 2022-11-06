from pytest import raises

from app.domain.errors.base import BaseErrors
from app.services.security import jwt


def test_jwt_service():

    access_token = jwt.create_access_token('token test')

    token_value = jwt.decode_token(access_token)

    password = 'super secret password'

    hashed_password = jwt.get_password_hash(password)

    assert token_value.sub == 'token test'

    assert jwt.check_password(password, hashed_password=hashed_password)

    assert not jwt.check_password('hacked password', hashed_password=hashed_password)

    with raises(BaseErrors):
        jwt.decode_token('fake token')