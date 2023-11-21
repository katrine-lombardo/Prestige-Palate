# """
# Restaurant:

# Retrieve: SELECT * FROM restaurants WHERE id = :google_place_id;
# Insert: INSERT INTO restaurants (id, google_place_id) VALUES (:id, :google_place_id) RETURNING id;
# """

# from pydantic import BaseModel
# import os
# from queries.pool import pool


# class Error(BaseModel):
#     message: str


# class RestaurantIn(BaseModel):
#     google_place_id: str


# class RestaurantOut(BaseModel):
#     id: int
#     google_place_id: str


# class RestaurantQueries:
#     def get_restaurant(self, google_place_id: str) -> RestaurantOut:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 # SQL query to retrieve user data
#                 cur.execute(
#                     """
#                     SELECT google_place_id
#                     FROM restaurants
#                     WHERE google_place_id = %s;
#                     """,
#                     [google_place_id],
#                 )
#                 restaurant = cur.fetchone()
#                 if restaurant is None:
#                     raise Exception("Restaurant not found")
#                 return RestaurantOut(**restaurant)

#     def get_all_restaurants(self) -> list[RestaurantOut]:
#         with pool.connection() as conn:
#             with conn.cursor() as cur:
#                 try:
#                     cur.execute("SELECT * FROM restaurants;")
#                     restaurants = cur.fetchall()
#                     return [
#                         {
#                             column.name: row[i]
#                             for i, column in enumerate(cur.description)
#                         }
#                         for row in restaurants
#                     ]
#                 except Exception as e:
#                     return {
#                         "message": f"Could not retrieve restaurants: {str(e)}"
#                     }
