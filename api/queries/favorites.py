from queries.pool import pool
from typing import List


class FavoriteQueries:
    def __init__(self):
        self.pool = pool

    def add_favorite(self, user_id: int, place_id: str):
        with self.pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO favorites (user_id, place_id)
                    VALUES (%s, %s) 
                    ON CONFLICT DO NOTHING;
                    """,
                    (user_id, place_id),
                )

    def get_favorites(self, user_id: int) -> List[dict]:
        with self.pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT place_id
                    FROM favorites
                    WHERE user_id = %s;
                    """,
                    (user_id,),
                )
                favorites = cur.fetchall()
                return [{"place_id": fav[0]} for fav in favorites]

    def remove_favorite(self, user_id: int, place_id: str):
        with self.pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE 
                    FROM favorites 
                    WHERE user_id = %s 
                    AND place_id = %s;
                    """,
                    (user_id, place_id),
                )
