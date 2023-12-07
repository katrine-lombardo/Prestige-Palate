import os
import requests
from pydantic import BaseModel


api_key = os.getenv('GOOGLE_API_KEY')


class LocationSearchIn(BaseModel):
    location: str


class LocationSearchOut(BaseModel):
    location: str
    location_search_id: str
    viewport: dict


def geocode_location_search(location: str, api_key: str) -> LocationSearchOut:
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    params = {
        "address": location,
        "key": api_key
    }
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        if data.get("status") == "OK" and "results" in data:
            results = data["results"][0]
            location_id = results.get("place_id")
            formatted_address = results.get("formatted_address")
            viewport = results.get("geometry", {}).get("viewport")

            return LocationSearchOut(
                location=formatted_address,
                location_search_id=location_id,
                viewport=viewport
            )
        else:
            raise ValueError("Invalid response data from Geocoding API")
    else:
        raise ConnectionError(
            f"Failed to connect to Geocoding API (Status Code: {response.status_code})"
        )
