from queries.accounts import AccountOut
from queries.reviews import (
    ReviewIn,
    ReviewOut,
    ReviewQueries,
    Error,
    ReviewUpdate,
)
from typing import List, Optional, Union, Annotated
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
    Response,
)
from authenticator import authenticator
import requests, os

router = APIRouter()
api_key = os.getenv("GOOGLE_API_KEY")


@router.get("/api/restaurants/{place_id}/reviews")
async def get_google_reviews_for_restaurant(place_id: str):
    try:
        url = f"https://places.googleapis.com/v1/places/{place_id}"

        headers = {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": api_key,
            "X-Goog-FieldMask": "reviews",
        }

        response = requests.get(url, headers=headers)

        if response.status_code == 200:
            data = response.json()
            return data
        else:
            raise HTTPException(
                status_code=500,
                detail=f"Request failed with status code {response.status_code}",
            )
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.get(
    "/api/restaurants/{place_id}/reviews",
    response_model=list[ReviewOut],
)
async def get_app_reviews_for_restaurant(
    place_id: str,
    reviews: ReviewQueries = Depends(),
):
    return reviews.get_app_reviews_for_restaurant(place_id)


@router.get(
    "/api/accounts/{username}/reviews/",
    response_model=List[ReviewOut],
)
async def get_reviews_by_account(
    username: str,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(authenticator.get_current_account_data),
):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not authorized to see these reviews",
        )
    return reviews.get_reviews_by_account(username)


@router.post(
    "/api/restaurants/{place_id}/reviews/",
    response_model=Union[ReviewOut, Error],
)
async def create_review(
    review: ReviewIn,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Cannot create a review with these credentials",
        )
    return reviews.create_review(review, current_user["username"])


@router.put(
    "/api/accounts/{account_id}/reviews/{review_id}", response_model=ReviewOut
)
async def update_review(
    review_id: int,
    review_data: ReviewUpdate,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(authenticator.get_current_account_data),
):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Cannot update this review with these credentials",
        )
    return reviews.update_review(review_id, review_data)


@router.delete(
    "/api/accounts/{account_id}/reviews/{review_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_review(
    review_id: int,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(authenticator.get_current_account_data),
):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    success = reviews.delete_review(review_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Review not found"
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)
