from fastapi import FastAPI, APIRouter, HTTPException, Request, status
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

CORS_HOST = os.environ.get("CORS_HOST")
if not CORS_HOST:
    origins = ["http://localhost:3000", "http://localhost:5173"]
else:
    origins = [CORS_HOST]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)