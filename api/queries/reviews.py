from pydantic import BaseModel
from typing import Optional
from psycopg_pool import ConnectionPool
from datetime import datetime


class ReviewIn(BaseModel):
    text: str
    restaurant_id: int
    rating: float
    user_icon: Optional[str] = None
    photo_id: Optional[int] = None


class ReviewOut(BaseModel):
    id: int
    publish_time: datetime
    author: int
    text: str
    restaurant_id: int
    rating: float
    user_icon: Optional[str] = None
    photo_id: Optional[int] = None


class ReviewUpdate(BaseModel):
    text: Optional[str] = None
    restaurant_id: Optional[int] = None
    rating: Optional[float] = None
    user_icon: Optional[str] = None
    photo_id: Optional[int] = None


class ReviewQueries:
    def get_reviews_by_user(self, username: str) -> list[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM reviews
                    WHERE author = (SELECT id FROM accounts WHERE username = %s);
                    """,
                    [username],
                )
                reviews = []
                for row in cur.fetchall():
                    reviews.append(ReviewOut(**row))
                return reviews

    def delete_review(self, review_id: int) -> bool:
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

    def create_review(
        self, review: ReviewIn, author_username: str
    ) -> ReviewOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO reviews (author, user_icon, text, restaurant_id, rating, photo_id)
                    VALUES ((SELECT id FROM accounts WHERE username = %s), %s, %s, %s, %s, %s)
                    RETURNING *;
                    """,
                    [
                        author_username,
                        review.user_icon,
                        review.text,
                        review.restaurant_id,
                        review.rating,
                        review.photo_id,
                    ],
                )
                return ReviewOut(**cur.fetchone())

    # def update_review(
    #     self, review_id: int, review_data: ReviewUpdate
    # ) -> ReviewOut:
    #     set_clause = ", ".join(
    #         [
    #             f"{key} = %s"
    #             for key in review_data.dict().keys()
    #             if review_data.dict()[key] is not None
    #         ]
    #     )
    #     values = list(review_data.dict().values()) + [review_id]

    #     with pool.connection() as conn:
    #         with conn.cursor() as cur:
    #             cur.execute(
    #                 f"""
    #                 UPDATE reviews
    #                 SET {set_clause}
    #                 WHERE id = %s
    #                 RETURNING *;
    #                 """,
    #                 values,
    #             )
    #             return ReviewOut(**cur.fetchone())

    def get_reviews_for_restaurant(
        self, restaurant_id: int
    ) -> list[ReviewOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT * FROM reviews
                    WHERE restaurant_id = %s;
                    """,
                    [restaurant_id],
                )
                reviews = []
                for row in cur.fetchall():
                    reviews.append(ReviewOut(**row))
                return reviews
