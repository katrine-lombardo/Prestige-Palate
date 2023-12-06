import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;
const bucketRegion = import.meta.env.VITE_AWS_BUCKET_REGION;
const s3Client = new S3Client({
    region: bucketRegion,
    credentials: {
        accessKeyId: import.meta.env.VITE_S3_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_S3_SECRET_ACCESS_KEY,
    },
});

const UpdateReview = () => {
    const { username, review_id } = useParams();
    const [reviewForm, setReviewForm] = useState({
        title: "",
        text: "",
        rating: 0,
        photo_urls: [],
    });

    const [fileInputValue, setFileInputValue] = useState("");
    const [isReviewUpdated, setIsReviewUpdated] = useState(false);
    const { token } = useAuthContext();
    const fileInputRef = useRef(null);

    const uploadToS3 = async (photos) => {
        const uploadPromises = photos.map(async (photo) => {
            const params = {
                Bucket: bucketName,
                Key: photo.name,
                Body: photo,
                ContentType: photo.type,
            };
            try {
                await s3Client.send(new PutObjectCommand(params));
                const url = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${photo.name}`;
                console.log("Success", url);
                return url;
            } catch (err) {
                console.error("Error", err);
                throw err; // Propagate the error
            }
        });

        try {
            const urls = await Promise.all(uploadPromises);
            return urls;
        } catch (err) {
            throw err; // Propagate the error
        }
    };

    const handlePhotoUpload = async () => {
        try {
            const urls = await uploadToS3(reviewForm.photo_urls);
            setReviewForm((prevReviewForm) => ({
                ...prevReviewForm,
                photo_urls: urls,
            }));
            window.alert("Files uploaded successfully!");

            // Do not reset the file input value here

        } catch (err) {
            console.error("Upload failed:", err);
            // Handle the error, e.g., display another notification
        }
    };

    const handleStarClick = (selectedRating) => {
        setReviewForm({
            ...reviewForm,
            rating: selectedRating,
        });
    };

    const handleInputChange = (e) => {
        setReviewForm((prevReviewForm) => ({
            ...prevReviewForm,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePhotoChange = (e) => {
        if (e.target.files.length > 0) {
            // Use the spread operator to concatenate the new files with the existing ones
            setReviewForm((prevReviewForm) => ({
                ...prevReviewForm,
                photo_urls: [...prevReviewForm.photo_urls, ...e.target.files],
            }));
            setFileInputValue(e.target.value); // Update file input value
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:8000/api/accounts/${username}/reviews/${review_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(reviewForm),
                }
            );

            if (response.ok) {
                console.log("Review updated successfully");
                setReviewForm({
                    title: "",
                    text: "",
                    rating: 0,
                    photo_urls: [],
                });
                setIsReviewUpdated(true);
                setFileInputValue(""); // Reset file input value after successful post
                if (fileInputRef.current) {
                    fileInputRef.current.value = ""; // Reset the file input value
                }
            } else {
                console.error("Error updating review:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating review:", error);
        }
    };

    return (
        <div className="card p-4 text-center">
            <h2 className="mb-4">Write a Review</h2>

            {isReviewPosted && (
                <div className="alert alert-success" role="alert">
                    Your review has been posted!
                </div>
            )}

            {isPhotoUploaded && (
                <div className="alert alert-success" role="alert">
                    Photo uploaded successfully!
                </div>
            )}
            <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
                <div className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        placeholder="Title"
                        value={reviewForm.title}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        style={{ width: '70%', marginBottom: '10px', marginRight: '10px' }}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                onClick={() => handleStarClick(star)}
                                style={{
                                    cursor: "pointer",
                                    color: star <= reviewForm.rating ? "gold" : "gray",
                                    fontSize: "20px", // Adjust the font size for larger stars
                                    verticalAlign: 'middle', // Align stars vertically with the title input
                                    marginBottom: '10px', // Adjust margin as needed
                                }}
                            >
                                ★
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mb-3">
                    <textarea
                        id="description"
                        placeholder="Write your thoughts here...."
                        name="text"
                        value={reviewForm.text}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                        style={{ width: '100%', height: '150px', marginBottom: '10px' }}
                    ></textarea>
                </div>

                <div className="mb-3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <input
                            placeholder="photo_url"
                            type="file"
                            accept="image/*"
                            name="photo_url"
                            id="imageInput"
                            className="form-control"
                            onChange={handlePhotoChange}
                            multiple
                            ref={fileInputRef}
                            value={fileInputValue}
                            style={{ marginRight: '10px' }}
                        />
                        <button type="button" onClick={handlePhotoUpload} className="btn btn-primary" style={{ width: '175px', marginRight: '10px' }}>
                            Upload Photo
                        </button>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateReview;
