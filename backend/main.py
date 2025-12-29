from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router
from chat import router as chat_router

app = FastAPI()

app.include_router(chat_router)
# 🔥 CORS MUST BE HERE (TOP)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],      # OPTIONS, POST, GET
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")




@app.get("/")
def root():
    return {"message": "Backend is running"}



from fastapi import FastAPI
from database import Base, engine
import auth, chat

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(chat.router)

