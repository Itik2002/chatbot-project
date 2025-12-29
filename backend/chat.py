from fastapi import APIRouter, Depends
from jose import jwt
from utils import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/chat")

def get_current_user(token: str = Depends(lambda: "")):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    return payload["user_id"]

@router.post("/")
def chat_endpoint(payload: dict, user_id: int = Depends(get_current_user)):
    return {
        "status": "received",
        "sent_to_agent": payload
    }
