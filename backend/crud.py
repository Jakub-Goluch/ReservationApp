from sqlalchemy.orm import Session

from . import models, schemas


def get_client(db: Session, client_id: int):
    return db.query(models.Client).filter(models.Client.id == client_id).first()


def create_client(db: Session, client: schemas.ClientCreate):
    db_client = models.Client(email=client.email, login=client.login, password=client.password, name=client.name,
                              phone_num=client.phone_num)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client
