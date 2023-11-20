from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from fastapi import APIRouter
from routers import accounts, photos
from dotenv import load_dotenv

load_dotenv()
# print(os.environ) # Commented out to prevent logging environment variables


app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(photos.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "module": 3,
            "week": 17,
            "day": 5,
            "hour": 19,
            "min": "00",
        }
    }
