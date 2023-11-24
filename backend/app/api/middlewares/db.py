from app.db.session import SessionLocal

#Esta función permite crear una session en la base de datos para poder hacer 
# querys en ella
def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()