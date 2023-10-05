from pydantic import BaseModel
from sqlalchemy import Date


class ReservationBase(BaseModel):
    day: Date
    num_of_ppl: int


class ReservationCreate(ReservationBase):
    pass


class Reservation(ReservationBase):
    id: int
    client_id: int
    table_id: int

    class Config:
        orm_mode = True


class TableBase(BaseModel):
    num_of_ppl: int


class TableCreate(TableBase):
    pass


class Table(TableBase):
    id: int
    reservations: list[Reservation] = []

    class Config:
        orm_mode = True


class ClientBase(BaseModel):
    name: str
    email: str
    phone_num: str


class ClientCreate(ClientBase):
    login: str
    password: str


class Client(ClientBase):
    id: int
    reservations: list[Reservation] = []

    class Config:
        orm_mode = True