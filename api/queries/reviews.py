from pydantic import BaseModel
from typing import Optional, List, Union
from queries.pool import pool
from datetime import datetime


class Error(BaseModel):
    message: str


class DuplicateReviewError(ValueError):
    pass


class ReviewIn(BaseModel):
    title: str
    text: str
    rating: float
    photo_url: str


class ReviewOut(BaseModel):
    id: int
    username: str
    place_id: str
    publish_time: datetime
    title: str
    text: str
    rating: float
    photo_url: Optional[str]


class ReviewUpdate(BaseModel):
    title: Optional[str] = None
    text: Optional[str] = None
    rating: Optional[float] = None
    photo_url: Optional[str] = None


class ReviewQueries:
    def get_reviews_by_account(self, username: str) -> List[ReviewOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT * FROM reviews
                        WHERE username = (SELECT username FROM accounts WHERE username = %s);
                        """,
                        [username],
                    )
                    reviews = []
                    for row in cur.fetchall():
                        row_dict = {
                            column.name: value
                            for column, value in zip(cur.description, row)
                        }
                        reviews.append(ReviewOut(**row_dict))
                    return reviews
        except Exception:
            return {
                "message": "Could not get reviews for this account's username"
            }

    def delete_review(self, review_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        DELETE FROM reviews
                        WHERE id = %s;
                        """,
                        [review_id],
                    )
                    return cur.rowcount > 0
        except Exception as e:
            return Error(message="Failed to get delete review")

    def create_review(
        self, place_id: str, review: ReviewIn, username: str
    ) -> Union[ReviewOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                            INSERT INTO reviews (username, place_id, title, text, rating, photo_url)
                            VALUES (%s, %s, %s, %s, %s, %s)
                            RETURNING *;
                        """,
                        [
                            username,
                            place_id,
                            review.title,
                            review.text,
                            review.rating,
                            review.photo_url,
                        ],
                    )
                    conn.commit()
                    record = cur.fetchone()
                    print("record: ", record)
                    if record is None:
                        return ValueError("No records found")
                    else:
                        review_data = {
                            "id": record[0],
                            "username": record[1],
                            "place_id": record[2],
                            "publish_time": record[3],
                            "title": record[4],
                            "text": record[5],
                            "rating": record[6],
                            "photo_url": record[7],
                        }
                        print("review data: ", review_data)
                        return ReviewOut(**review_data)
        except DuplicateReviewError:
            return ValueError("Review already exists for this restaurant")

    def update_review(
        self, review_id: int, review_data: ReviewUpdate
    ) -> Union[ReviewOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    # Fetch the existing review
                    cur.execute(
                        """
                        SELECT * FROM reviews
                        WHERE id = %s;
                        """,
                        [review_id],
                    )
                    existing_record = cur.fetchone()

                    if existing_record is None:
                        return Error(message="Review not found")

                    # Create a dictionary from the existing record
                    existing_review = {
                        column.name: value
                        for column, value in zip(
                            cur.description, existing_record
                        )
                    }

                    # Update the existing review with the new data
                    updated_review = {
                        **existing_review,
                        **review_data.dict(exclude_unset=True),
                    }

                    # Build the UPDATE query
                    update_query = """
                        UPDATE reviews
                        SET title = %s, text = %s, rating = %s, photo_url = %s
                        WHERE id = %s
                        RETURNING *;
                    """

                    # Execute the update query
                    cur.execute(
                        update_query,
                        [
                            updated_review["title"],
                            updated_review["text"],
                            updated_review["rating"],
                            updated_review["photo_url"],
                            review_id,
                        ],
                    )

                    # Fetch the updated record
                    updated_record = cur.fetchone()

                    if updated_record is not None:
                        return ReviewOut(**updated_review)
                    else:
                        return ValueError("Failed to update review")
        except Exception as e:
            return ValueError("Failed to update review")

    def get_app_reviews_for_restaurant(self, place_id: str) -> List[ReviewOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                        SELECT * FROM reviews
                        WHERE place_id = %s;
                        """,
                        [place_id],
                    )
                    reviews = []
                    for row in cur.fetchall():
                        row_dict = {
                            column.name: value
                            for column, value in zip(cur.description, row)
                        }
                        reviews.append(ReviewOut(**row_dict))
                    return reviews
        except Exception as e:
            return Error(message="Failed to get app reviews")
