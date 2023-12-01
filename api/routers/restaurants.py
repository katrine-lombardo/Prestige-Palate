from fastapi import APIRouter, Depends, HTTPException, status, Query
# from queries.restaurants import RestaurantIn, RestaurantOut, RestaurantQueries
from queries.geocode import LocationSearchIn, geocode_location_search, api_key
import requests
import json

router = APIRouter()


@router.get("/api/restaurants")
async def search_restaurants_by_location(location: str = Query(..., description="Begin Your Flavor Journey")):
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
                "X-Goog-FieldMask": "id,types,internationalPhoneNumber,formattedAddress,rating,websiteUri,regularOpeningHours.weekdayDescriptions,priceLevel,userRatingCount,displayName,primaryType,reviews,photos"
            }


            response = requests.get(url, headers=headers)


            if response.status_code == 200:
                data = response.json()
            else:
                raise HTTPException(status_code=500, detail=f"Request failed with status code {response.status_code}")
            if "photos" in data:
                for photo in data["photos"]:
                    photo_reference = photo.get("name")
                    if photo_reference:
                        photo_url = f"https://places.googleapis.com/v1/{photo_reference}/media?key={api_key}&maxHeightPx=1000&maxWidthPx=1000"
                        photo_response = requests.get(photo_url, allow_redirects=True)
                        if photo_response.status_code == 200:
                            photo["imageUrl"] = photo_response.url
                        else:
                            photo["imageUrl"] = "Error fetching photo"
            return data
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


# @router.get("/api/restaurants/{place_id}/photos/{photo_reference}")
# def restaurant_photos(photo_reference: str,
#                         maxHeightPx: int = 400,
#                         maxWidthPx: int = 400,
#                         skipHttpRedirect: bool = True):
#     try:
#         base_url = "https://places.googleapis.com/v1"
#         endpoint = f"{photo_reference}/media"
#         params = {
#             'maxHeightPx': maxHeightPx,
#             'maxWidthPx': maxWidthPx,
#             'key': api_key,  # Replace with your actual API key
#             'skipHttpRedirect': skipHttpRedirect
#         }
#         final_url = f"{base_url}{endpoint}"
#         print("Requesting URL:", final_url)
#         response = requests.get(final_url, params=params)
#         print(response)
#         if response.status_code == 200:
#             return Response(content=response.content, media_type="image/jpeg")
#         else:
#             raise HTTPException(status_code=response.status_code, detail="Request failed")

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
# @router.get("/api/restaurants/{photo_id}/photos")
# async def restaurant_photos(photo_id: str,
#     max_height_px: int = 800,
#     max_width_px: int = 800,
#     skip_http_redirect: bool = True
# ):
#     try:
#         base_url = "https://places.googleapis.com/v1/"
#         image_id = f"{photo_id}/media"
#         max_height_param = f"maxHeightPx={max_height_px}"
#         max_width_param = f"maxWidthPx={max_width_px}"
#         skip_http_redirect_param = f"skipHttpRedirect={str(skip_http_redirect).lower()}"

#         url = f"{base_url}{image_id}?key={api_key}&{max_height_param}&{max_width_param}&{skip_http_redirect_param}"
#         print(url)
#         response = requests.get(url)
#         print(response)
#         if response.status_code == 200:
#             data = response.json()
#             return data
#         else:
#             raise HTTPException(status_code=500, detail=f"Request failed with status code {response.status_code}")

#     except Exception as e:
#         raise HTTPException(status_code=500, detail="Internal Server Error")








































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
