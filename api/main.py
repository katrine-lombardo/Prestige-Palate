from typing import Any, Callable
from fastapi import FastAPI, APIRouter as FastAPIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.types import DecoratedCallable
import os
from authenticator import authenticator
from routers import accounts, follow, referrals
from routers import restaurants, photos, reviews, favorites


class APIRouter(FastAPIRouter):
    def api_route(
        self, path: str, *, include_in_schema: bool = True, **kwargs: Any
    ) -> Callable[[DecoratedCallable], DecoratedCallable]:
        if path.endswith("/"):
            path = path[:-1]

        add_path = super().api_route(
            path, include_in_schema=include_in_schema, **kwargs
        )

        alternate_path = path + "/"
        add_alternate_path = super().api_route(
            alternate_path, include_in_schema=False, **kwargs
        )

        def decorator(func: DecoratedCallable) -> DecoratedCallable:
            add_alternate_path(func)
            return add_path(func)

        return decorator


app = FastAPI(router_class=APIRouter)

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
        "http://localhost:5173",
        "https://mambo-number-5.gitlab.io",
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
