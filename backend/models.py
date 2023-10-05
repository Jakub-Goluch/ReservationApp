from sqlalchemy import Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship

from .database import Base


class Table(Base):
    __tablename__ = "table"

    id = Column(Integer, primary_key=True, index=True)
    num_of_ppl = Column(Integer, index=True)

    reservations = relationship("Reservation", back_populates="table")


class Reservation(Base):
    __tablename__ = "reservation"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("client.id"))
    table_id = Column(Integer, ForeignKey("table.id"))
    day = Column(Date)
    num_of_ppl = Column(Integer)

    client = relationship("Client", back_populates="reservations")
    table = relationship("Table", back_populates="reservations")


class Client(Base):
    __tablename__ = "client"

    id = Column(Integer, primary_key=True, index=True)
    login = Column(String, unique=True, index=True)
    password = Column(String, index=True)
    name = Column(String)
    email = Column(String(60), unique=True, index=True)
    phone_num = Column(String(9), index=True)

    reservations = relationship("Reservation", back_populates="client")
