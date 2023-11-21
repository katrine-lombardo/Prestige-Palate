from fastapi import FastAPI, File, UploadFile, APIRouter, Form
import boto3
from botocore.exceptions import NoCredentialsError, ClientError
from queries.photos import PhotoQueries, PhotoIn, PhotoOut

router = APIRouter()


# Specify your S3 bucket name and the base folder where restaurant photos are stored
BUCKET_NAME = "prestigepalate"
BASE_FOLDER = "restaurants"


@router.post("/photos")
async def upload_photo(
    file: UploadFile = File(...),
    user_id: int = Form(...),
    restaurant_id: int = Form(...),
):
    try:
        # Construct the S3 key based on restaurant and user IDs
        s3_key = f"{BASE_FOLDER}/{restaurant_id}/{user_id}/{file.filename}"
        s3 = boto3.client("s3")

        # Upload the file to S3 with the constructed key
        s3.upload_fileobj(file.file, BUCKET_NAME, s3_key)

        # Generate the S3 URL
        s3_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"

        # Convert the S3 URL to photo_url
        photo_url = s3_url

        # Create a PhotoIn object for the insert_photo method
        photo_data = PhotoIn(user_id=user_id, restaurant_id=restaurant_id)

        # Call the insert_photo method with the generated URL
        PhotoQueries().insert_photo(photo_data, photo_url)

        return {
            "message": "Photo uploaded successfully",
            "photo_url": photo_url,
        }

    except NoCredentialsError:
        return {"message": "AWS credentials not available"}


# Define a GET endpoint to retrieve a photo by photo ID
@router.get("/photos/{photo_id}", response_model=PhotoOut)
async def get_photo_by_id(photo_id: int):
    # Fetch the PhotoOut object from your database or wherever it's stored
    photo = PhotoQueries.show_photo_by_id(photo_id)

    if photo:
        return photo
    else:
        raise HTTPException(status_code=404, detail="Photo not found")


# Define a GET endpoint to retrieve photos by user ID
@router.get("/photos/users/{user_id}", response_model=list[PhotoOut])
async def get_photos_by_user(user_id: int):
    photos = PhotoQueries.show_photos_by_user(user_id)
    return photos


# Define a GET endpoint to retrieve photos by restaurant ID
@router.get(
    "/photos/restaurants/{restaurant_id}", response_model=list[PhotoOut]
)
async def get_photos_by_restaurant(restaurant_id: int):
    photos = PhotoQueries.show_photos_by_restaurant(restaurant_id)
    return photos


# Define a DELETE endpoint to delete a photo by photo ID
@router.delete("/photos/{photo_id}")
async def delete_photo_by_id(photo_id: int):
    # Check if the photo exists before deleting
    photo = PhotoQueries.show_photo_by_id(photo_id)
    s3 = boto3.client("s3")

    if photo:
        s3_url = photo.photo_url

        # Split the S3 URL by '/'
        parts = s3_url.split("/")

        # Join the parts that represent the S3 key (excluding the protocol and bucket name)
        s3_key = "/".join(parts[3:])
        s3.delete_object(Bucket=BUCKET_NAME, Key=s3_key)

        # Delete the photo from your database or wherever it's stored
        PhotoQueries.delete_photo(photo_id)

        return {"message": "Photo deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Photo not found")
