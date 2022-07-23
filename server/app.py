from fastapi import Depends, FastAPI
from fastapi.templating import Jinja2Templates
from db import User, create_db_and_tables, get_user_db
from schemas import UserCreate, UserRead, UserUpdate
from users import auth_backend, current_active_user, fastapi_users
from fastapi import FastAPI, Request, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from config import Settings
from utils import send_email

app = FastAPI()

setting = Settings()

templates = Jinja2Templates(directory="templates")


origins = [
    "http://localhost",
    setting.frontend_url,
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"])

app.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"],)

app.include_router(fastapi_users.get_reset_password_router(), prefix="/auth", tags=["auth"],)

app.include_router(fastapi_users.get_verify_router(UserRead), prefix="/auth", tags=["auth"],)

app.include_router(fastapi_users.get_users_router(UserRead, UserUpdate), prefix="/users", tags=["users"],)

# app.include_router(fastapi_users.get_users_router())

# Create a authenticated route to get all users

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(current_active_user)):
    return {"message": f"Hello {user.email}!"}


# @router.get("/all", dependencies=[Depends(current_active_user)])
# async def get_all_users():
#     users = await users_collection.find().to_list(length=None)
#     for user in users:
#         del user["_id"]
#     return users


@app.on_event("startup")
async def on_startup():
    # Not needed if you setup a migration system like Alembic
    await create_db_and_tables()

