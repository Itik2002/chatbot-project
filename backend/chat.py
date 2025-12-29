from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from schemas import ChatRequest
from utils import SECRET_KEY, ALGORITHM

router = APIRouter(prefix="/chat", tags=["chat"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload["user_id"]
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/")
def chat_endpoint(
    payload: ChatRequest,
    user_id: int = Depends(get_current_user)
):
    return {
        "status": "received",
        "user_id": user_id,
        "sent_to_agent": payload
    }
