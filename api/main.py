from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from authenticator import authenticator
from routers import accounts, follow, referrals
from routers import restaurants, photos, reviews, favorites


app = FastAPI()

app.include_router(authenticator.router)
app.include_router(follow.router, tags=["Follow"])
app.include_router(accounts.router, tags=["Accounts"])
app.include_router(referrals.router, tags=["Referrals"])
app.include_router(photos.router, tags=["Photos"])
app.include_router(reviews.router, tags=["Reviews"])
app.include_router(restaurants.router, tags=["Restaurants"])
app.include_router(favorites.router, tags=["Favorites"])

CORS_HOST = os.environ.get("CORS_HOST")
if not CORS_HOST:
    origins = [
        "http://localhost:3000", 
        "http://localhost:5173", 
        "https://mambo-number-5.gitlab.io/prestige-palate/"
        ]
else:
    origins = [CORS_HOST]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "ROOT PATH PRESTIGE PALATE"}


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
