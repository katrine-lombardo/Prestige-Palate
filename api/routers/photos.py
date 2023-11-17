from fastapi import File, UploadFile, HTTPException, APIRouter
import boto3
from botocore.exceptions import NoCredentialsError

router = APIRouter()

# Your AWS S3 bucket name
BUCKET_NAME = "prestigepalate"
# The folder inside the bucket where you want to store the images
S3_FOLDER = "images/"

s3 = boto3.client("s3")


def upload_to_s3(file, bucket_name, s3_folder):
    try:
        s3.upload_fileobj(file.file, bucket_name, s3_folder + file.filename)
        return True
    except NoCredentialsError:
        raise HTTPException(
            status_code=500, detail="AWS credentials not available."
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    success = upload_to_s3(file, BUCKET_NAME, S3_FOLDER)
    if success:
        return {"message": "Image uploaded successfully"}
    else:
        raise HTTPException(
            status_code=500, detail="Failed to upload image to S3"
        )
