import datetime
import uuid
from typing import Optional

from fastapi_users import schemas


class UserRead(schemas.BaseUser[uuid.UUID]):
    name: str
    # birthdate: Optional[datetime.date]


class UserCreate(schemas.BaseUserCreate):
    name: str
    # birthdate: Optional[datetime.date]


class UserUpdate(schemas.BaseUserUpdate):
    name: Optional[str]
    # birthdate: Optional[datetime.date]