### Instructions
 - Run both backend and frontend, 
 - Let's first run backend follow the, first create your virtual environment (if you installed all packages locally using pip you don't need to create virtual environments)
  ```
  // change directory to server folder
  cd server
  python3 -m venv virtual-env
  source virtual-env/bin/activate
  pip install -r requirements.txt
  ```
  - There is a **.env** file inside server folder, must change all credentials of your own otherwise you can't send email to send token in order to reset password, put all sensetive informations here
  - now you can run the app
  ```
  uvicorn app:app --reload
  ```
  - Now run your react frontend. make sure you have installed node.js
  ```
  cd client
  npm install
  npm start
  ```
  - This is for development purpose, for production you need to change some variables .env file from server, secure with ssl for sending email, and need to change some variables from config.js from client folder

### Requirement for the project (Please use an existing sign up/login form template)

LOGIN PAGE --> LOGIN REDIRECTS TO A HOMEPAGE
REGISTRATION PAGE --> ADD USER DETAILS TO THE DATABASE
PASSWORD RESET  --> PASSWORD RESET FUNCTION WORKS
HOMEPAGE --> STATIC HOMEPAGE THAT CAN BE VIEWED ONCE A USER LOGS IN INTO A SESSION SUCCESSFULLY


Objective : The LOGIN/REGISTRATION system to be built on an FASTAPI-users Framework

 - Run main file `python3 main.py`
 - Login
```
curl -X 'POST' \
  'http://0.0.0.0:8000/auth/jwt/login' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=&username=test%40gmail.com&password=Test1234&scope=&client_id=&client_secret='
```
 - Single user
```
curl -X 'GET' \
  'http://0.0.0.0:8000/users/5' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOGUwNWRiNzYtYTMzMC00YTgyLTkwMGMtMGRlNWJkNTk1N2MxIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2NTgzMTkxMTZ9.yt715qdfcvRqHOd2wt-2JX5c1njBWebBOgVoYg0qKcQ'
```
 - Get authenticated route
```
curl -X 'GET' \
  'http://0.0.0.0:8000/authenticated-route' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOGUwNWRiNzYtYTMzMC00YTgyLTkwMGMtMGRlNWJkNTk1N2MxIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2NTgzMTkxMTZ9.yt715qdfcvRqHOd2wt-2JX5c1njBWebBOgVoYg0qKcQ'
```
- Logout
```
curl -X 'POST' \
  'http://0.0.0.0:8000/auth/jwt/logout' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiOGUwNWRiNzYtYTMzMC00YTgyLTkwMGMtMGRlNWJkNTk1N2MxIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2NTgzMTkxMTZ9.yt715qdfcvRqHOd2wt-2JX5c1njBWebBOgVoYg0qKcQ' \
  -d ''
```
 - Register User
```
curl -X 'POST' \
  'http://0.0.0.0:8000/auth/register' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "mdshayon0@gmail.com",
  "password": "Test1234",
  "is_active": true,
  "is_superuser": false,
  "is_verified": false
}'
```
 - Forget password
```
curl -X 'POST' \
  'http://0.0.0.0:8000/auth/forgot-password' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "mdshayon0@gmail.com"
}'
```

 - Update user (super user and varified is not working)
```
curl -X 'PATCH' \
  'http://localhost:8000/users/me' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMmJiOWI4ODktYjg1Yy00Y2FmLWJkNDEtMjY3MWIxNTlmNjhlIiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2NTgzOTE3OTN9.bRftwPKm9n_2zycIkVoTvqIJMWDV9pjIzCern-OmUoc' \
  -H 'Content-Type: application/json' \
  -d '{
  "password": "stsjhdsjdhsjhsring",
  "email": "mdshayon0@gmail.com",
  "is_active": true,
  "is_superuser": true,
  "is_verified": true
}'
```
 - Make superuser from database
 - SQLite commands
 - Open SQLite in terminal `shayon@shayon-X556UQK:~/Documents/python-user-auth/server$ sqlite3 test.db `
```
get_reset_password_router SELECT * FROM user;
mdsamsuzzoha5222@gmail.com|$2b$12$C4cpSmUSLroX5mrdwr60uuAO9z0jf.grA3TCPu5MirDroPp4oMsEy|1|0|0|1510a654-ac83-4e61-b961-ed0d527cade6
sqlite> .database
main: /home/shayon/Documents/python-user-auth/server/test.db
sqlite> .tables
user
sqlite> .schema user
CREATE TABLE user (
	email VARCHAR(320) NOT NULL, 
	hashed_password VARCHAR(1024) NOT NULL, 
	is_active BOOLEAN NOT NULL, 
	is_superuser BOOLEAN NOT NULL, 
	is_verified BOOLEAN NOT NULL, 
	id CHAR(36) NOT NULL, 
	PRIMARY KEY (id)
);
CREATE UNIQUE INDEX ix_user_email ON user (email);
sqlite> .indexes
ix_user_email            sqlite_autoindex_user_1
```

- Get token to rest password
```
curl -X 'POST' \
  'http://localhost:8000/auth/forgot-password' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "email": "mdsamsuzzoha5222@gmail.com"
}'
```
- Rest password
- Get all users - https://github.com/fastapi-users/fastapi-users/discussions/743
- Add more field to the user
- [schemas](https://fastapi-users.github.io/fastapi-users/10.1/configuration/schemas/)
- [Flow](https://fastapi-users.github.io/fastapi-users/10.1/usage/flow/)
- [Request verify token](https://fastapi-users.github.io/fastapi-users/10.1/usage/routes/?h=token#post-request-verify-token)
