from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from tortoise.contrib.fastapi import register_tortoise
from tortoise import fields
from tortoise.models import Model

app = FastAPI()


class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(50, unique=True)
    password_hash = fields.CharField(128)
    
    @classmethod
    async def get_user(cls, username):
        return cls.get(username=username)
    
    def verify_password(self, password):
        return True


register_tortoise(
    app,
    db_url='sqlite://bd.sqlite3',
    modules={'models': ['main']},
    generate_schemas=True,
    add_exception_handlers=True
)
    

