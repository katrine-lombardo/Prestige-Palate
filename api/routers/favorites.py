from queries.accounts import AccountOut
from queries.favorites import FavoriteQueries
from fastapi import APIRouter, Depends, HTTPException
from authenticator import authenticator

router = APIRouter()


@router.post("/api/restaurants/{place_id}/favorite")
def add_favorite(
    place_id: str,
    current_user: AccountOut = Depends(authenticator.get_current_account_data),
):
    queries = FavoriteQueries()
    try:
        queries.add_favorite(current_user["id"], place_id)
        return {"status": "success", "message": "Added to favorites"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}"
        )


@router.get("/api/user/favorites")
def list_favorites(
    current_user: AccountOut = Depends(authenticator.get_current_account_data),
):
    queries = FavoriteQueries()
    try:
        favorites = queries.get_favorites(current_user["id"])
        return favorites
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}"
        )


@router.delete("/api/restaurants/{place_id}/favorite")
def remove_favorite(
    place_id: str,
    current_user: AccountOut = Depends(authenticator.get_current_account_data),
):
    queries = FavoriteQueries()
    try:
        queries.remove_favorite(current_user["id"], place_id)
        return {"status": "success", "message": "Removed from favorites"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}"
        )
