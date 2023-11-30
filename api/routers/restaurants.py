from fastapi import APIRouter, Depends, HTTPException, status, Query
# from queries.restaurants import RestaurantIn, RestaurantOut, RestaurantQueries
from queries.geocode import LocationSearchIn, geocode_location_search, api_key
import requests
import json

router = APIRouter()


@router.get("/api/restaurants")
def search_restaurants_by_location(location: str = Query(..., description="Begin Your Flavor Journey")):
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
            lo_lon=sw_lon
        )

        return {"location_data": location_result, "restaurants": restaurant_results}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


def text_search(search_query: str = "restaurants",
                hi_lat: float = None,
                hi_lon: float = None,
                lo_lat: float = None,
                lo_lon: float = None):
    try:

        url = "https://places.googleapis.com/v1/places:searchText"


        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": api_key,
            "X-Goog-FieldMask": "places.id,places.formattedAddress,places.rating,places.displayName.text"
        }


        request_body = {
            "textQuery": search_query,
        	"maxResultCount": 20,
            "minRating": 4,
	        "includedType": "restaurant",
	        "strictTypeFiltering": True,
	        "locationRestriction": {
		        "rectangle": {
			        "low": {
                        "latitude": lo_lat,
                        "longitude": lo_lon
                    },
                    "high": {
                        "latitude": hi_lat,
                        "longitude": hi_lon
                    }
                }
            }
        }

        request_body_json = json.dumps(request_body)

        response = requests.post(url, data=request_body_json, headers=headers)


        if response.status_code == 200:
            data = response.json()
            return data
        else:
            raise HTTPException(status_code=500, detail=f"Request failed with status code {response.status_code}")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.get("/api/restaurants/{place_id}")
async def restaurant_details(place_id: str):
    try:

        url = f"https://places.googleapis.com/v1/places/{place_id}"


        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": api_key,
            "X-Goog-FieldMask": "id,types,internationalPhoneNumber,formattedAddress,rating,websiteUri,regularOpeningHours.weekdayDescriptions,priceLevel,userRatingCount,displayName,primaryType,reviews"
        }


        response = requests.get(url, headers=headers)


        if response.status_code == 200:
            data = response.json()
            return data
        else:
            raise HTTPException(status_code=500, detail=f"Request failed with status code {response.status_code}")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")











































# from fastapi import APIRouter, Depends, HTTPException, status
# from queries.restaurants import RestaurantIn, RestaurantOut, RestaurantQueries


# router = APIRouter()


# @router.get("/restaurants/{google_place_id}", response_model=RestaurantOut)
# async def get_restaurant(
#     google_place_id: str, queries: RestaurantQueries = Depends()
# ):
#     try:
#         return queries.get_restaurant(google_place_id)
#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         raise HTTPException(
#             status_code=500, detail=f"An error occurred: {str(e)}"
#         )


# @router.get("/restaurants/", response_model=list[RestaurantOut])
# async def get_all_restaurants(queries: RestaurantQueries = Depends()):
#     try:
#         return queries.get_all_restaurants()
#     except HTTPException as e:
#         raise e
#     except Exception as e:
#         raise HTTPException(
#             status_code=500, detail=f"An error occurred: {str(e)}"
#         )
