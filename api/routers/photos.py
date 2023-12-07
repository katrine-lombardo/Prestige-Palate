from queries.photos import PhotoQueries, PhotoOut
from typing import List
from fastapi import (
    APIRouter,
    HTTPException,
)

router = APIRouter()


@router.get("/photos/{username}", response_model=List[PhotoOut])
async def get_photos_by_username(username: str):
    photoQueries = PhotoQueries()
    try:
        photo_urls = photoQueries.get_photos_by_username(username)
        if not photo_urls:
            raise HTTPException(
                status_code=404,
                detail="No photos found for the given username",
            )
        return photo_urls
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error in get_photos_by_username route: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/photos/restaurant/{place_id}", response_model=List[PhotoOut])
async def get_photos_by_restaurant(place_id: str):
    photoQueries = PhotoQueries()
    try:
        photo_urls = photoQueries.get_photos_by_restaurant(place_id)
        if not photo_urls:
            raise HTTPException(
                status_code=404,
                detail=f"No photos found for the given place_id: {place_id}",
            )
        return photo_urls
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error in get_photos_by_place route: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
