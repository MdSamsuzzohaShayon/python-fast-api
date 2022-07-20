# Override base models
from typing import List
from pydantic import BaseModel
from datetime import datetime

class _PostBase(BaseModel):
    title: str 
    content: str 

class PostCreate(_PostBase):
    pass 

class Post(_PostBase):
    id: int 
    owner_id: int 
    date_created : datetime
    date_last_updated : datetime

    class Config:
        orm_mode = True 

class _UserBase(BaseModel):
    email: str 

class UserCreate(_UserBase):
    password: str 

class User(_UserBase):
    id: int 
    is_active: bool
    posts: List[Post] = []

    class Config:
        orm_mode = True 
         
