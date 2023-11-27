from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, restaurants, photos, reviews, reviews, favorites

app = FastAPI()
app.include_router(authenticator.router)
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(photos.router, tags=["Photos"])
app.include_router(reviews.router, tags=["Reviews"])
app.include_router(restaurants.router, tags=["Restaurants"])
app.include_router(favorites.router, tags=["Favorites"])

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
