from pydantic import BaseModel
from typing import List
from datetime import datetime

class SignupRequest(BaseModel):
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

# 👇 ye NEW add hoga (chat ke liye)
class Message(BaseModel):
    role: str
    content: str

class SessionInfo(BaseModel):
    started_at: datetime
    expires_at: datetime

class Constraints(BaseModel):
    max_tokens: int
    response_style: str

class ChatRequest(BaseModel):
    request_id: str
    conversation_id: str
    user_id: str
    message: Message
    recent_messages: List[Message]
    session: SessionInfo
    constraints: Constraints
