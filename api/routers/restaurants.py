from fastapi import APIRouter, HTTPException, Query
from queries.geocode import geocode_location_search, api_key
import requests
import json

router = APIRouter()


@router.get("/api/restaurants")
async def search_restaurants_by_location(
    location: str = Query(..., description="Begin Your Flavor Journey")
):
    try:
        location_result = geocode_location_search(location, api_key)

        ne_lat = location_result.viewport["northeast"]["lat"]
        ne_lon = location_result.viewport["northeast"]["lng"]
        sw_lat = location_result.viewport["southwest"]["lat"]
        sw_lon = location_result.viewport["southwest"]["lng"]

        restaurant_results = text_search(
            search_query="restaurants",
            hi_lat=ne_lat,
            hi_lon=ne_lon,
            lo_lat=sw_lat,
            lo_lon=sw_lon,
        )

        return {
            "location_data": location_result,
            "restaurants": restaurant_results,
        }
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


def text_search(
    search_query: str = "restaurants",
    hi_lat: float = None,
    hi_lon: float = None,
    lo_lat: float = None,
    lo_lon: float = None,
):
    try:
        url = \
            f"https://places.googleapis.com/" \
            f"v1/places:searchText"

        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": api_key,
            "X-Goog-FieldMask": \
                f"places.id," \
                f"places.formattedAddress," \
                f"places.rating," \
                f"places.displayName.text," \
                f"places.location",
        }

        request_body = {
            "textQuery": search_query,
            "maxResultCount": 20,
            "minRating": 4,
            "includedType": "restaurant",
            "strictTypeFiltering": True,
            "locationRestriction": {
                "rectangle": {
                    "low": {"latitude": lo_lat, "longitude": lo_lon},
                    "high": {"latitude": hi_lat, "longitude": hi_lon},
                }
            },
        }

        request_body_json = json.dumps(request_body)

        response = requests.post(url, data=request_body_json, headers=headers)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Request failed with status code"
                f"{response.status_code}",
            )
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get("/api/restaurants/{place_id}")
async def restaurant_details(place_id: str):
    try:
        url = \
            f"https://places.googleapis.com/" \
            f"v1/places/{place_id}"

        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": api_key,
            "X-Goog-FieldMask": "id,types,internationalPhoneNumber,formattedAddress,rating,websiteUri,regularOpeningHours.weekdayDescriptions,priceLevel,userRatingCount,displayName,primaryType,reviews",
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Request failed with status code" 
                f"{response.status_code}",
            )
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/api/restaurants/{place_id}/photos")
async def restaurant_photos(place_id: str):
    try:
        url = f"https://places.googleapis.com/v1/places/{place_id}"

        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": api_key,
            "X-Goog-FieldMask": "photos",
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Request failed with status code"
                f"{response.status_code}",
            )
        if "photos" in data:
            for photo in data["photos"]:
                photo_reference = photo.get("name")
                if photo_reference:
                    photo_url = (
                        f"https://places.googleapis.com/v1/"
                        f"{photo_reference}/media?"
                        f"key={api_key}"
                        f"&maxHeightPx=1000&maxWidthPx=1000"
                    )
                    photo_response = requests.get(
                        photo_url, allow_redirects=True
                    )
                    if photo_response.status_code == 200:
                        photo["imageUrl"] = photo_response.url
                    else:
                        photo["imageUrl"] = "Error fetching photo"
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
