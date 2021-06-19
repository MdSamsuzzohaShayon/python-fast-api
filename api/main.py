from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional


# SETUP OUR APP - THIS APP VARIABLE NEED TO PASS TO RUN THIS APP
app = FastAPI()


fakedb = []

# THIS IS SCHEMA
class Course(BaseModel):
    id: int
    name: str
    price: float
    is_early_bird: Optional[bool] = None

# DEFINE ROUTE
@app.get("/")
def read_root():
    return {"Greedings": "Welcome to Fast API"}


@app.get("/courses")
def get_courses():
    return fakedb

# TAKE QUERY PARAMETERS 
@app.get("/courses/{course_id}")
def get_a_course(course_id: int):
    course = course_id - 1
    return fakedb[course]


@app.post("/courses")
def add_course(course: Course):
    fakedb.append(course.dict())
    return fakedb[-1]


@app.delete("/courses/{course_id}")
def delete_course(course_id: int):
    fakedb.pop(course_id - 1)
    return {"task" : "Successfully deleted"}