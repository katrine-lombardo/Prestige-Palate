from pydantic import BaseModel
from typing import List
from queries.pool import pool
from typing import List, Optional


class PhotoOut(BaseModel):
    username: str
    photo_urls: Optional[List[str]]


class PhotoQueries:
    def get_photos_by_username(self, username: str) -> List[PhotoOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                            SELECT username, photo_urls
                            FROM reviews
                            WHERE username = %s AND photo_urls IS NOT NULL;
                            """,
                        [username],
                    )
                    photo_url_dict = {}  # To group photo URLs by username
                    for row in cur.fetchall():
                        row_dict = {
                            column.name: value
                            for column, value in zip(cur.description, row)
                        }
                        current_username = row_dict["username"]
                        if current_username not in photo_url_dict:
                            photo_url_dict[current_username] = {
                                "username": current_username,
                                "photo_urls": [],
                            }
                        photo_url_dict[current_username]["photo_urls"].extend(
                            row_dict["photo_urls"]
                        )

                    # Convert the dictionary values to a list of PhotoOut objects
                    photo_urls = [
                        PhotoOut(
                            username=data["username"],
                            photo_urls=data["photo_urls"]
                        )
                        for data in photo_url_dict.values()
                    ]
                    return photo_urls
        except Exception as e:
            print(f"Error in get_photo_urls_by_username: {e}")
            raise

    def get_photos_by_restaurant(self, place_id: str) -> List[PhotoOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    cur.execute(
                        """
                            SELECT username, photo_urls
                            FROM reviews
                            WHERE place_id = %s AND photo_urls IS NOT NULL;
                        """,
                        [place_id],
                    )
                    photos = []
                    for row in cur.fetchall():
                        row_dict = {
                            column.name: value
                            for column, value in zip(cur.description, row)
                        }
                        photos.append(PhotoOut(**row_dict))
                    return photos
        except Exception:
            return {"message": "Could not get photos for this place_id"}
