from fastapi import FastAPI, Body, Depends
import uvicorn
from app.model import PostSchema, UserSchema, UserLoginSchema
from app.auth.jwt_handler import  signJWT
from app.auth.jwt_bearer import JwtBearer

posts = [
    {
        "id": 1,
        "title": "title 1",
        "text": "text 1"
    },
{
        "id": 2,
        "title": "title 2",
        "text": "text 2"
    },
{
        "id": 3,
        "title": "title 3",
        "text": "text 3"
    },
]

users = []

app = FastAPI()

# testing
@app.get('/', tags=["test"])
def test():
    return {"Hello", "World"}

# get posts
@app.get("/posts", tags=["Posts"])
def get_posts():
    return {"data": posts}

# Get single post
@app.get("/posts/{id}", tags=["posts"])
def get_one_post(id: int):
    if id > len(posts):
        return {'Error': "Post with this ID does not exist"}

    for post in posts:
        if post["id"] == id:
            return {"Data": post }


# Create a single post
@app.post("/posts", dependencies=[Depends(JwtBearer())], tags=["posts"])
def add_post(post: PostSchema):
    post.id = len(posts) + 1
    posts.append(post.dict())
    return {"msg": "Post is been added"}


#user signup - create a new user
@app.post("/user/signup", tags=["user"])
def user_signup(user: UserSchema = Body(default= None)):
    users.append(user)
    return signJWT(user.email)

def check_user(data: UserLoginSchema):
    for user in users:
        if user.email == data.email and user.password == data.password:
            return True
        return False


@app.post('/user/login', tags=["user"])
def user_login(user: UserLoginSchema = Body(default=None)):
    if check_user(user):
        return signJWT(user.email)
    else:
        return {"Error": "Invalid login details"}

