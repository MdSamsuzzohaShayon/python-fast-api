import uuid
from typing import Optional
from fastapi import Depends, Request
from fastapi_users import BaseUserManager, FastAPIUsers, UUIDIDMixin
from fastapi_users.authentication import (AuthenticationBackend, BearerTransport, JWTStrategy,)
from fastapi_users.db import SQLAlchemyUserDatabase
from db import User, get_user_db
from config import Settings
from utils import send_email

setting = Settings()
SECRET = setting.session_secret


class UserManager(UUIDIDMixin, BaseUserManager[User, uuid.UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        # https://www.tutorialspoint.com/python/python_sending_email.htm
        # 💁 This token should be mailed to user email
        link = f"{setting.frontend_url}/reset-password/{token}"
        html = "<div><h1>You have requested to reset your email</h1>"
        html += f"<a href='{link}'>Click the link to rest your password</a>"
        html += f"<div>{link}</div>"
        html += "</div>"
        send_email(send_email_list=[user.email], subject=f"Rest password in {setting.app_name}", text="You requested reset password", html=html)
        # 💁 create an url with token and new password (Handle the url from frontend browser)
        # 💁 Send an url to the browser along with token and new password
        # 💁 Make a request from browser using token and new password
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")


async def get_user_manager(user_db: SQLAlchemyUserDatabase = Depends(get_user_db)):
    yield UserManager(user_db)


bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)


auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[User, uuid.UUID](get_user_manager, [auth_backend])

current_active_user = fastapi_users.current_user(active=True)