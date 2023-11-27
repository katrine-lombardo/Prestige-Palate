from api.queries.accounts import AccountOut
from api.queries.favorites import FavoriteQueries
from fastapi import APIRouter, Depends, HTTPException
from authenticator import authenticator

from queries.pool import pool

router = APIRouter()


@router.post("/restaurants/{place_id}/favorite")
async def add_favorite(
    place_id: str,
    current_user: AccountOut = Depends(authenticator.get_current_account_data),
):
    queries = FavoriteQueries(pool)
    try:
        await queries.add_favorite(current_user.id, place_id)
        return {"status": "success", "message": "Added to favorites"}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}"
        )


@router.get("/user/favorites")
async def list_favorites(
    current_user: AccountOut = Depends(authenticator.get_current_account_data),
):
    queries = FavoriteQueries(pool)
    try:
        favorites = await queries.get_favorites(current_user.id)
        return favorites
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"An error occurred: {str(e)}"
        )
