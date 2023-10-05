from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/client/", response_model=schemas.Client)
def create_client(client: schemas.ClientCreate, client_id: int, db: Session = Depends(get_db)):
    db_client = crud.get_client(db, client_id=client_id)
    if db_client:
        raise HTTPException(status_code=400, detail="Id already taken")
    return crud.create_client(db=db, client=client)


@app.get("/client/", response_model=schemas.Client)
def read_client(client_id: int = 0, db: Session = Depends(get_db)):
    client = crud.get_client(db, client_id)
    if client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return client
