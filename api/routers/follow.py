from fastapi import (
    Depends,
    HTTPException,
    status,
    APIRouter,
)
from queries.follow import (
    FollowQueries,
    FollowIn,
    FollowOut,
)
from authenticator import authenticator
from pydantic import BaseModel
from typing import Union, List


class Error(BaseModel):
    message: str


router = APIRouter()


@router.post("/api/accounts/follow/", response_model=Union[FollowOut, Error])
async def follow_account(
    info: FollowIn,
    accounts: FollowQueries = Depends(),
    current_user: dict = Depends(authenticator.try_get_current_account_data),
):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not authenticated.",
        )
    try:
        result = accounts.follow_account(info, current_user["username"])
        return result
    except Exception as e:
        return {"message": f"Error: {str(e)}"}


@router.delete("/api/accounts/unfollow/", response_model=bool)
async def unfollow_account(
    info: FollowIn,
    accounts: FollowQueries = Depends(),
    current_user: dict = Depends(authenticator.try_get_current_account_data),
):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not authenticated.",
        )
    try:
        result = accounts.unfollow_account(info, current_user["username"])
        return result
    except Exception as e:
        return {"message": f"Error: {str(e)}"}


@router.get("/api/accounts/followers/{username}", response_model=List[str])
async def get_followers_by_username(
    username: str,
    accounts: FollowQueries = Depends(),
):
    followers = accounts.get_followers_by_username(username)
    return followers


@router.get("/api/accounts/following/{username}", response_model=List[str])
async def get_following_by_username(
    username: str,
    accounts: FollowQueries = Depends(),
):
    following = accounts.get_following_by_username(username)
    return following
