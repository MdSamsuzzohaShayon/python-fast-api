from fastapi import FastAPI, Path
from typing import Optional
from pydantic import BaseModel

app = FastAPI()


students = {
    1: {
        "name": "Jhon",
        "age": 17,
        "year": "12",
    }
}

class Student(BaseModel):
    name: str
    age: int
    year: str

class UpdateStudent(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    year: Optional[str] = None

@app.get("/")
def index():
    return {"Hello": "World"}

# using path parameters
@app.get('/get-student/{student_id}')
def get_student(student_id: int = Path(None, description="The ID of the student", gt=0)):
    return students[student_id]


# Query parameters
@app.get('/get-by-name')
def getByName(*, name: Optional[str], not_essential= None):
    print(not_essential)
    for student_id in students:
        if students[student_id]["name"] == name:
            return students[student_id]
        return {"data": "not found"}


# Combining both parameters
@app.get('/combine-parameters/{student_id}')
def getByName(*, student_id: int, name: Optional[str], not_essential= None):
    print(not_essential)
    for student_id in students:
        if students[student_id]["name"] == name:
            return students[student_id]
        return {"data": "not found"}



@app.post("/create-student/{student_id}")
def create_student(student_id: int, student: UpdateStudent):
    if student_id in students:
        return {"Error": "Student exists"}

    students[student_id] = student
    return students[student_id]


@app.put("/update-student/{student_id}")
def update_student(student_id: int, student: UpdateStudent):
    if student_id not in students:
        return {"Error": "student does not exiist"}

    if student.name != None:
        students[student_id].name = student.name
    if student.age != None:
        students[student_id].age = student.age
    if student.name != None:
        students[student_id].year = student.year

    return students[student_id]

@app.delete("/delete-student/{student_id}")
def delete_student(student_id: int):
    if student_id not in students:
        return {"Error": "Student does not exist"}
    del students[student_id]
    return {"Message": "Student deleted successfully"}
