from api.queries.accounts import AccountOut
from fastapi import APIRouter, Depends, HTTPException, status
from queries.reviews import ReviewIn, ReviewOut, ReviewQueries
from authenticator import authenticator

review_router = APIRouter()


@review_router.get(
    "/api/restaurants/{restaurant_id}/reviews", response_model=list[ReviewOut]
)
async def get_reviews_for_restaurant(
    restaurant_id: int, reviews: ReviewQueries = Depends()
):
    return reviews.get_reviews_for_restaurant(restaurant_id)


@review_router.post("/api/reviews", response_model=ReviewOut)
async def create_review(
    review: ReviewIn,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(authenticator.get_current_user),
):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return reviews.create_review(review, current_user.username)


@review_router.put("/api/reviews/{review_id}", response_model=ReviewOut)
async def update_review(
    review_id: int,
    review_data: ReviewIn,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(authenticator.get_current_user),
):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    return reviews.update_review(review_id, review_data)


@review_router.delete(
    "/api/reviews/{review_id}", status_code=status.HTTP_204_NO_CONTENT
)
async def delete_review(
    review_id: int,
    reviews: ReviewQueries = Depends(),
    current_user: AccountOut = Depends(authenticator.get_current_user),
):
    if not current_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED)
    success = reviews.delete_review(review_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Review not found"
        )
    return Response(status_code=status.HTTP_204_NO_CONTENT)
