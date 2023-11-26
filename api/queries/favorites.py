from pydantic import BaseModel
from typing import List


class FavoriteQueries:
    def __init__(self, db_pool):
        self.db_pool = db_pool

    async def add_favorite(self, user_id: int, place_id: str):
        async with self.db_pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(
                    "INSERT INTO favorites (user_id, place_id) VALUES (%s, %s) ON CONFLICT DO NOTHING;",
                    (user_id, place_id),
                )

    async def get_favorites(self, user_id: int) -> List[dict]:
        async with self.db_pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(
                    "SELECT place_id FROM favorites WHERE user_id = %s;",
                    (user_id,),
                )
                favorites = cur.fetchall()
                return [{"place_id": fav[0]} for fav in favorites]
