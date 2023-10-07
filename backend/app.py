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


@app.post("/table/", response_model=schemas.Table)
def create_table(table: schemas.TableCreate, table_id: int, db: Session = Depends(get_db)):
    db_table = crud.get_table(db, table_id=table_id)
    if db_table:
        raise HTTPException(status_code=400, detail="Id already taken")
    return crud.create_table(db=db, table=table)


@app.get("/table/", response_model=schemas.Table)
def read_table(table_id: int = 1, db: Session = Depends(get_db)):
    table = crud.get_table(db, table_id)
    if table is None:
        raise HTTPException(status_code=404, detail="Table not found")
    return table


@app.get("/reservation/", response_model=schemas.Reservation)
def read_reservation(reservation_id: int = 1, db: Session = Depends(get_db)):
    reservation = crud.get_reservation(db, reservation_id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return reservation


@app.get("/reservations/", response_model=list[schemas.Reservation])
def read_reservations(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    reservations = crud.get_reservations(db, skip=skip, limit=limit)
    return reservations


@app.post("/table/{table_id}/{client_id}/reservations/", response_model=schemas.Reservation)
def create_reservation_for_table(table_id: int, client_id: int, reservation: schemas.ReservationCreate,
                                 db: Session = Depends(get_db)):
    return crud.create_table_reservation(db=db, reservation=reservation, table_id=table_id, client_id=client_id)


@app.get("/reservation/{day}/", response_model=list[schemas.Table])
def read_free_tables_for_date(day: str, num_of_ppl: int = 3, db: Session = Depends(get_db)):
    return crud.get_free_tables_for_a_date(db, day=day, num_of_ppl=num_of_ppl)
