from typing import Annotated
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from . import models, schemas, crud
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

#CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def fake_decode_token(token):
    return schemas.Client(name="jan", email=token + "fakedecoded", phone_num="123456789", id="2")


def fake_hash_password(password: str):
    return "fakehashed" + password


async def get_current_client(token: Annotated[str, Depends(oauth2_scheme)]):
    client = fake_decode_token(token)
    if not client:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    return client


@app.post("/token/")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    client = crud.get_client_by_login(db, form_data.username)
    if not client:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not form_data.password == client.password:
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    return {"access_token": client.login, "token_type": "bearer"}


@app.get("/users/me")
async def read_users_me(current_user: Annotated[schemas.Client, Depends(get_current_client)]):
    return current_user


@app.post("/client/", response_model=schemas.Client)
def create_client(client: schemas.ClientCreate, login: str, db: Session = Depends(get_db)):
    db_client = crud.get_client_by_login(db, login=login)
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


@app.get("/reserve_table/", response_model=schemas.Table)
def read_free_tables_for_date(day: str, num_of_ppl: int = 3, db: Session = Depends(get_db)):
    return crud.get_free_tables_for_a_date(db, day=day, num_of_ppl=num_of_ppl)


@app.delete("/delete_reservation/{reservation_id}/", response_model=schemas.Reservation)
def delete_reservation(reservation_id: int, db: Session = Depends(get_db)):
    reservation = crud.get_reservation(db=db, reservation_id=reservation_id)
    if reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found")
    return crud.delete_reservation(db=db, reservation=reservation)


@app.delete("/delete_user/{client_login}", response_model=schemas.Client)
def delete_client(client_login: str, db: Session = Depends(get_db)):
    client = crud.get_client_by_login(db=db, login=client_login)
    if client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return crud.delete_client(db=db, client=client)


@app.delete("/delete_table/{table_id}", response_model=schemas.Table)
def delete_table(table_id: int, db: Session = Depends(get_db)):
    table = crud.get_table(db=db, table_id=table_id)
    if table is None:
        raise HTTPException(status_code=404, detail="Table not found")
    return crud.delete_table(db=db, table=table)
