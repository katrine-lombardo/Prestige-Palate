from pydantic import BaseModel
from typing import List


class FavoriteQueries:
    def __init__(self, db_pool):
        self.db_pool = db_pool

    async def add_favorite(self, user_id: int, google_place_id: str):
        async with self.db_pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(
                    "SELECT id FROM restaurants WHERE google_place_id = %s;",
                    (google_place_id,),
                )
                restaurant = cur.fetchone()
                if not restaurant:
                    await cur.execute(
                        "INSERT INTO restaurants (google_place_id) VALUES (%s) RETURNING id;",
                        (google_place_id,),
                    )
                    restaurant_id = cur.fetchone()[0]
                else:
                    restaurant_id = restaurant[0]
                await cur.execute(
                    "INSERT INTO favorites (user_id, restaurant_id) VALUES (%s, %s) ON CONFLICT DO NOTHING;",
                    (user_id, restaurant_id),
                )

    async def get_favorites(self, user_id: int) -> List[dict]:
        async with self.db_pool.acquire() as conn:
            async with conn.cursor() as cur:
                await cur.execute(
                    "SELECT r.google_place_id FROM favorites f JOIN restaurants r ON f.restaurant_id = r.id WHERE f.user_id = %s;",
                    (user_id,),
                )
                favorites = cur.fetchall()
                return [{"google_place_id": fav[0]} for fav in favorites]
