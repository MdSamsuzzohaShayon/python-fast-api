from sqlalchemy import Column, Integer, String
from fastapi_users.db import SQLAlchemyBaseUserTable
from db import Base

class UserTable(Base, SQLAlchemyBaseUserTable):
    sid = Column(Integer)
    fname = Column(String)
    lname = Column(String)