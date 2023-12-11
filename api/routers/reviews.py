from queries.accounts import AccountOut
from queries.reviews import (
    ReviewIn,
    ReviewOut,
    ReviewUpdate,
    ReviewQueries,
    Error,
)
from typing import List, Union
from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    status,
)
from authenticator import authenticator
import requests
import os

router = APIRouter()
api_key = os.getenv("GOOGLE_API_KEY")


@router.get("/api/restaurants/{place_id}/googlereviews")
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
                detail=f"Request failed with status code"
                f" {response.status_code}",
            )
    except Exception:
        raise HTTPException(
            status_code=500, detail="Not a valid restaurant place id"
        )


@router.get(
    "/api/restaurants/{place_id}/reviews",
    response_model=List[ReviewOut],
)
async def get_app_reviews_for_restaurant(
    place_id: str,
    reviews: ReviewQueries = Depends(),
):
    try:
        success = reviews.get_app_reviews_for_restaurant(place_id)
        if not reviews:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No app reviews for this restaurant",
            )
        return success
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No reviews found for this restaurant",
        )


@router.get(
    "/api/accounts/{username}/reviews",
    response_model=List[ReviewOut],
)
async def get_reviews_by_account(
    username: str,
    reviews: ReviewQueries = Depends(),
):
    try:
        success = reviews.get_reviews_by_account(username)
        if not reviews:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="No reviews found for this user",
            )
        return success
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.post(
    "/api/restaurants/{place_id}/reviews",
    response_model=Union[ReviewOut, Error],
)
async def create_review(
    place_id: str,
    review: ReviewIn,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
):
    try:
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Cannot create a review with these credentials",
            )

        review.photo_urls = (
            review.photo_urls
            if isinstance(review.photo_urls, list)
            else [review.photo_urls]
        )

        return reviews.create_review(
            place_id, review, current_user["username"]
        )
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")


@router.put(
    "/api/accounts/{username}/reviews/{review_id}", response_model=ReviewOut
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
    try:
        success = reviews.update_review(review_id, review_data)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Review not found",
            )
        return success
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )


@router.delete(
    "/api/accounts/{username}/reviews/{review_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_review(
    review_id: int,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(authenticator.get_current_account_data),
):
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Cannot delete this review with those credentials",
        )
    try:
        success = reviews.delete_review(review_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Review not found",
            )
        return {
            "status_code": status.HTTP_204_NO_CONTENT,
            "detail": "Review successfully deleted.",
        }
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )


@router.get(
    "/api/restaurants/{place_id}/reviews/check-existing",
    response_model=dict,
)
async def check_existing_review(
    place_id: str,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(
        authenticator.try_get_current_account_data
    ),
):
    try:
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Cannot check existing review with these credentials",
            )

        existing_review = reviews.get_existing_review_id(
            place_id, current_user["username"]
        )

        if existing_review:
            return {"hasExistingReview": True, "reviewId": existing_review}
        else:
            return {"hasExistingReview": False, "reviewId": None}
    except Exception:
        raise HTTPException(status_code=500, detail="Internal Server Error")
