from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.db import base
from app.core.logging import get_logging

log = get_logging(__name__)


class TestBaseDB:
    engine = create_engine('sqlite:///:memory:')
    Session = sessionmaker(bind=engine)
    session = Session()
    
    def setup_method(self):
        base.Base.metadata.create_all(self.engine)
    
    def teardown_method(self):
        base.Base.metadata.drop_all(self.engine)
