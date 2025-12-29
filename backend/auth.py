from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User
from schemas import SignupRequest, LoginRequest, TokenResponse
from utils import create_access_token
import bcrypt

router = APIRouter(prefix="/auth")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/signup")
def signup(data: SignupRequest, db: Session = Depends(get_db)):
    hashed = bcrypt.hashpw(data.password.encode(), bcrypt.gensalt())
    user = User(email=data.email, password=hashed.decode())
    db.add(user)
    db.commit()
    return {"message": "User created"}

@router.post("/login", response_model=TokenResponse)
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not bcrypt.checkpw(data.password.encode(), user.password.encode()):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"user_id": user.id})
    return {"access_token": token}
