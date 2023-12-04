import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
const bucketRegion = import.meta.env.VITE_AWS_BUCKET_REGION;
const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
    },
});

const CreateReview = () => {
    const { place_id } = useParams();
    const [photo, setPhoto] = useState(null)
    const [reviewForm, setReviewForm] = useState({
        text: "",
        rating: "",
        photo_url: "",
    });

    const { token } = useAuthContext();

    const uploadToS3 = async (photo) => {
        const params = {
            Bucket: bucketName,
            Key: photo.name,
            Body: photo,
            ContentType: photo.type
        };
        try {
            const data = await s3Client.send(new PutObjectCommand(params));
            const url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${photo.name}`
            console.log("Success", url);
            return url;
        } catch (err) {
            console.error("Error", err);
        }
    };
    const handlePhotoUpload = () => {
        if (photo) {
            uploadToS3(photo)
                .then(url => {
                    setReviewForm(prevReviewForm => ({
                        ...prevReviewForm,
                        photo_url: url
                    }))
                })
                .catch(err => {
                    console.error("Upload failed:", err);
                });
        }
    };

    const handleStarClick = (selectedRating) => {
        setReviewForm({
            ...reviewForm,
            rating: selectedRating,
        });
    };

    const handleInputChange = (e) => {
        setReviewForm(prevReviewForm => ({
            ...prevReviewForm,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePhotoChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8000/api/restaurants/${place_id}/reviews/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(reviewForm),
            });

            if (response.ok) {
                console.log("Review posted successfully");
                setReviewForm({
                    text: "",
                    rating: "",
                    photo_url: "",
                });
            } else {
                console.error("Error posting review:", response.statusText);
            }
        } catch (error) {
            console.error("Error posting review:", error);
        }
    };

    return (
        <div className="card p-4 text-center">
            <h2 className="mb-4">Write a Review</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="text"
                        value={reviewForm.text}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Rating:</label>
                    <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => handleStarClick(star)}
                                style={{
                                    cursor: "pointer",
                                    color: star <= reviewForm.rating ? "gold" : "gray",
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="photo_url" className="form-label">
                        Attach a photo:
                    </label>
                    <input
                        placeholder="photo_url"
                        type="file"
                        accept="image/*"
                        name="photo_url"
                        id="imageInput"
                        className="form-control"
                        onChange={handlePhotoChange}
                    />

                    <button onClick={handlePhotoUpload} type="button">Upload Photo</button>
                </div>
                <button type="submit" className="btn btn-primary">
                    Post
                </button>
            </form>
        </div>
    );
};

export default CreateReview;
