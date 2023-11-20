from fastapi import FastAPI, File, UploadFile, APIRouter
import boto3
from botocore.exceptions import NoCredentialsError


router = APIRouter()


@router.post("/upload")
async def upload_file(file: UploadFile):
    try:
        # Replace 'your-bucket-name' with your actual S3 bucket name
        bucket_name = "prestigepalate"
        s3 = boto3.client("s3")

        # Upload the file to S3
        s3.upload_fileobj(file.file, bucket_name, file.filename)

        return {"message": "File uploaded successfully"}
    except NoCredentialsError:
        return {"message": "AWS credentials not available"}
