import os
from psycopg_pool import ConnectionPool
from pydantic import BaseModel, HttpUrl
from datetime import datetime
from typing import Optional, List
import boto3


pool = ConnectionPool(conninfo=os.environ.get("DATABASE_URL"))

BUCKET_NAME = "prestigepalate"


class PhotoIn(BaseModel):
    user_id: int
    restaurant_id: int


class PhotoOut(BaseModel):
    photo_id: int
    user_id: int
    photo_url: HttpUrl
    restaurant_id: int
    upload_date: datetime


class PhotoQueries:
    def insert_photo(self, photo_data: PhotoIn, photo_url: str) -> PhotoOut:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    # Check if the user exists in the "accounts" table
                    user_exists_query = "SELECT 1 FROM accounts WHERE id = %s;"
                    cur.execute(user_exists_query, [photo_data.user_id])
                    if not cur.fetchone():
                        raise Exception("User does not exist.")

                    # Set the upload_date to the current time
                    upload_date = datetime.now()
                    params = [
                        photo_data.user_id,
                        photo_url,
                        photo_data.restaurant_id,
                        upload_date,
                    ]
                    # SQL Query to insert the photo
                    insert_query = """
                    INSERT INTO photos (user_id, photo_url, restaurant_id, upload_date)
                    VALUES (%s, %s, %s, %s)
                    RETURNING photo_id, user_id, photo_url, restaurant_id, upload_date;
                    """
                    cur.execute(insert_query, params)

                    # Fetching and returning the inserted record
                    record = None
                    row = cur.fetchone()
                    if row:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        return PhotoOut(**record)
                    else:
                        raise Exception("Failed to insert photo record.")
                except Exception as e:
                    print(f"Exception occurred: {e}")
                    raise

    def show_photo_by_id(self, photo_id: int) -> Optional[PhotoOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    # SQL Query to fetch photo by ID
                    select_query = """
                    SELECT photo_id, user_id, photo_url, restaurant_id, upload_date
                    FROM photos
                    WHERE photo_id = %s;
                    """
                    cur.execute(select_query, [photo_id])

                    # Fetching and returning the photo record
                    row = cur.fetchone()
                    if row:
                        record = {}
                        for i, column in enumerate(cur.description):
                            record[column.name] = row[i]
                        return PhotoOut(**record)
                    else:
                        return None  # Photo not found
                except Exception as e:
                    print(f"Exception occurred: {e}")
                    raise

    def show_photos_by_user(self, user_id: int) -> List[PhotoOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT * FROM photos WHERE user_id = %s;", [user_id]
                )
                photos = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    photos.append(PhotoOut(**record))
                return photos

    def show_photos_by_restaurant(self, restaurant_id: int) -> List[PhotoOut]:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT * FROM photos WHERE restaurant_id = %s;",
                    [restaurant_id],
                )
                photos = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    photos.append(PhotoOut(**record))
                return photos

    def delete_photo(self, photo_id: int):
        s3 = boto3.client("s3")
        
        with pool.connection() as conn:
            with conn.cursor() as cur:
                try:
                    # Check if the photo exists before deleting and get the necessary information
                    exists_query = """
                        SELECT photo_id, photo_url FROM photos WHERE photo_id = %s;
                    """
                    cur.execute(exists_query, [photo_id])
                    existing_photo = cur.fetchone()

                    if existing_photo:
                        # Extract photo_url from the tuple
                        photo_url = existing_photo[1]

                        # Split the S3 URL by '/'
                        s3_url_parts = photo_url.split("/")

                        # Join the parts that represent the S3 key (excluding the protocol and bucket name)
                        s3_key = "/".join(s3_url_parts[3:])

                        # Delete the photo from S3
                        s3.delete_object(Bucket=BUCKET_NAME, Key=s3_key)

                        # SQL Query to delete the photo
                        delete_query = "DELETE FROM photos WHERE photo_id = %s RETURNING photo_id;"
                        cur.execute(delete_query, [photo_id])

                        # Fetching and returning the deleted photo_id
                        deleted_photo_id = cur.fetchone()[0]
                        return {
                            "message": "Photo deleted successfully",
                            "photo_id": deleted_photo_id,
                        }
                    else:
                        raise Exception("Photo not found.")

                except Exception as e:
                    print(f"Exception occurred: {e}")
                    raise
