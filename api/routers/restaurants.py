from fastapi import APIRouter, Depends, HTTPException, status
from queries.restaurants import RestaurantIn, RestaurantOut, RestaurantQueries


router = APIRouter()


@router.get("/restaurants/{google_place_id}", response_model=RestaurantOut)
async def get_restaurant(
    google_place_id: str, queries: RestaurantQueries = Depends()
):
    try:
        return queries.get_restaurant(google_place_id)
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}"
        )


@router.get("/restaurants/", response_model=list[RestaurantOut])
async def get_all_restaurants(queries: RestaurantQueries = Depends()):
    try:
        return queries.get_all_restaurants()
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}"
        )
