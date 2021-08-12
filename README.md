# Python-fast-api authentication
 - [Tutorial](https://www.youtube.com/watch?v=6hTRw_HK3Ts)
 - Setup project
```
git clone https://github.com/MdSamsuzzohaShayon/python-fast-api.git
cd python-fast-api/
git branch -a
git checkout -b 3_jwt_authentication
virtualenv env_3_8_1
source env_3_8_1/bin/activate
pip install fastapi hypercorn
hypercorn main:app --reload
```
