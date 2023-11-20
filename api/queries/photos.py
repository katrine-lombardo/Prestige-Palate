import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))


class PhotoIn(BaseModel):
    user_id: int
    photo_url: str
    restaurant_id: int


class PhotoOut(BaseModel):
    photo_id: int
    user_id: int
    photo_url: str
    upload_date: datetime
    restaurant_id: int


class PhotoQueries:
    def create(self, data: PhotoIn) -> PhotoOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO photos (user_id, photo_url, restaurant_id)
                    VALUES (%s, %s, %s)
                    RETURNING photo_id, user_id, photo_url, upload_date, restaurant_id;
                    """,
                    [data.user_id, data.photo_url, data.restaurant_id]
                )
                record = cur.fetchone()
                return PhotoOut(**record)

    def delete(self, photo_id: int) -> bool:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM photos
                    WHERE photo_id = %s;
                    """,
                    [photo_id]
                )
                return cur.rowcount > 0
