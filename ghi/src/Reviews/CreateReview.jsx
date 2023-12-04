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
    const { id } = useParams();
    const [photo, setPhoto] = useState(null)
    const [reviewForm, setReviewForm] = useState({
        title:"",
        text: "",
        rating: "",
        photo_url: "",
    });

    const [isReviewPosted, setIsReviewPosted] = useState(false);

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
    const handlePhotoUpload = async () => {
        try {
            const url = await uploadToS3(photo);
            setReviewForm(prevReviewForm => ({
                ...prevReviewForm,
                photo_url: url
            }));
            window.alert("File uploaded successfully!"); // Show a pop-up notification
        } catch (err) {
            console.error("Upload failed:", err);
            // You can handle the error here, e.g., display another notification
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
            const response = await fetch(`http://localhost:8000/api/restaurants/${id}/reviews/`, {
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
                    title: "",
                    text: "",
                    rating: "",
                    photo_url: "",
                });
                setIsReviewPosted(true);
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

            {isReviewPosted && ( // Render the success message conditionally
                <div className="alert alert-success" role="alert">
                    Your review has been posted!
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label d-block mx-auto">
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={reviewForm.title}
                        onChange={handleInputChange}
                        className="form-control mx-auto"
                        required
                        style={{ width: '50%' }} // Set the width as needed
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                    </label>
                    <textarea
                        id="description"
                        placeholder="Write your thoughts here...."
                        name="text"
                        value={reviewForm.text}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        style={{ height: '150px' }} // Set the height as needed
                    ></textarea>
                </div>
                <div className="mb-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ marginRight: '10px' }}>
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
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <label htmlFor="photo_url" className="form-label" style={{ marginLeft: '10px' }}>
                        </label>
                        <input
                            placeholder="photo_url"
                            type="file"
                            accept="image/*"
                            name="photo_url"
                            id="imageInput"
                            className="form-control"
                            onChange={handlePhotoChange}
                            style={{ marginLeft: '10px' }}
                        />
                        <button type="button" onClick={handlePhotoUpload} className="btn btn-primary" style={{ marginLeft: '10px' }}>
                            Upload Photo
                        </button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">
                    Post
                </button>
            </form>
        </div>
    );
};

export default CreateReview;
