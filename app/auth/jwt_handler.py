import time
import jwt
from decouple import config # organize settings - easy to store environment variable in dot env file


JWT_SECRET = config("JWT_SECRET_KEY")
JWT_ALGORITHM = config("JWT_TOKEN_ALGORITHM")


# this gunction return generated token
def token_response(token: str):
    return {"access_token": token}

def signJWT(userID: str):
    payload = {
        "userID": userID,
        "expiry": time.time() + 600 # 600 milliseconds
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
    return token_response(token)


def decodeJWT(token: str):
    try:
        decode_token = jwt.decode(token, JWT_SECRET, algorithms=JWT_ALGORITHM)
        return decode_token if decode_token['expires'] >= time.time() else None
    except:
        return {}