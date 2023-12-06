import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import DeleteReview from "./DeleteReview";
import ListFollowers from "../Accounts/ListFollowers";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListMyReviews = () => {
    const [username, setUsername] = useState("");
    const [reviews, setReviews] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const [activeReviewId, setActiveReviewId] = useState(null);
    const { token } = useAuthContext();

    useEffect(() => {
        const handleFetchWithAPI = async () => {
            const url = `${tokenUrl}/token`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setUsername(data.account.username);
                })
                .catch((error) => console.error(error));
        };
        const fetchMyReviews = async () => {
            if (username) {
                const url = `${tokenUrl}/api/accounts/${username}/reviews`;
                fetch(url, {
                    credentials: "include",
                })
                    .then((response) => response.json())
                    .then(async (data) => {
                        const reviewsWithRestaurantNames = await Promise.all(
                            data.map(async (review) => {
                                const restaurantUrl = `${tokenUrl}/api/restaurants/${review.place_id}`;
                                const restaurantResponse = await fetch(
                                    restaurantUrl
                                );
                                const restaurantData =
                                    await restaurantResponse.json();
                                return {
                                    ...review,
                                    restaurantName:
                                        restaurantData.displayName.text,
                                };
                            })
                        );
                        setReviews(reviewsWithRestaurantNames);
                    })
                    .catch((error) => console.error(error));
            }
        };
        handleFetchWithAPI();
        fetchMyReviews();
    }, [token, username]);

    const handleEditReview = (review) => {
        setActiveReviewId(null);
        navigate(`/update-review/${username}/${review.id}`);
    };

    const handleToggleEditButton = (reviewId) => {
        setActiveReviewId(activeReviewId === reviewId ? null : reviewId);
    };

    const handleDeleteReview = (review) => {
        setActiveReviewId(review.id);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/api/accounts/${username}/reviews/${activeReviewId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                // Update state to remove the deleted review
                setReviews((prevReviews) =>
                    prevReviews.filter((review) => review.id !== activeReviewId)
                );

                // Close the delete modal
                setDeleteModalOpen(false);
            } else {
                console.error("Error deleting review:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    const handleCancelDelete = () => {
        setActiveReviewId(null);
        setDeleteModalOpen(false);
    };

    if (!token) {
        return <div>Please log in to see reviews</div>;
    }

    const renderNullReviews = () => {
        return (
            <div>
                <div className="container mt-4">
                    No Prestige Palate reviews here. Yet...
                </div>
                <div>
                    <Link to={`/`}>
                        <button
                            style={{ marginRight: "5px" }}
                            type="button"
                            className="btn btn-secondary mt-3 ms-2"
                        >
                            Start your culinary adventure now
                        </button>
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <div>
            <div className="container mb-4">
                <h3>My reviews</h3>
            </div>
            <nav className="container mb-3">
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                        className="nav-link active"
                        id="nav-reviews-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-reviews"
                        type="button"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                    >
                        Reviews
                    </button>
                    <button
                        className="nav-link"
                        id="nav-photos-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-photos"
                        type="button"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                    >
                        Photos
                    </button>
                    <button
                        className="nav-link"
                        id="nav-following-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-following"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                    >
                        Following
                    </button>
                    <button
                        className="nav-link"
                        id="nav-followers-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-followers"
                        type="button"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                    >
                        Followers
                    </button>
                </div>
            </nav>
            <div className="tab-content mt-3" id="nav-tabContent">
                <div
                    className="tab-pane fade show active mt-3"
                    id="nav-reviews"
                    role="tabpanel"
                    aria-labelledby="nav-reviews-tab"
                    tabIndex="0"
                >
                    <div className="container mt-3">
                        {!reviews.length ? (
                            renderNullReviews()
                        ) : (
                            <div>
                                {reviews.map((review, index) => (
                                    <div key={index} className="card border-0">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <Link
                                                    to={`/restaurants/${review.place_id}`}
                                                >
                                                    <h4>
                                                        {review.restaurantName}
                                                    </h4>
                                                </Link>
                                                <div className="d-flex justify-content-between">
                                                    <h5>{review.title}</h5>
                                                    <div>
                                                        {[1, 2, 3, 4, 5].map(
                                                            (star) => (
                                                                <span
                                                                    key={star}
                                                                    style={{
                                                                        color:
                                                                            star <=
                                                                                review.rating
                                                                                ? "gold"
                                                                                : "gray",
                                                                    }}
                                                                >
                                                                    ★
                                                                </span>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-text">
                                                <p>{review.text}</p>
                                                <p className="card-subtitle mb-1 text-body-secondary">
                                                    Date posted:{" "}
                                                    {new Date(
                                                        review.publish_time
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </p>
                                                <div className="d-flex justify-content-end">
                                                    <span
                                                        style={{
                                                            marginRight: "10px",
                                                            cursor: "pointer",
                                                            color: "blue",
                                                        }}
                                                        onClick={() =>
                                                            handleToggleEditButton(
                                                                review.id
                                                            )
                                                        }
                                                    >
                                                        ...
                                                    </span>
                                                    {activeReviewId ===
                                                        review.id && (
                                                            <>
                                                                <button
                                                                    className="btn btn-secondary"
                                                                    onClick={() =>
                                                                        handleEditReview(
                                                                            review
                                                                        )
                                                                    }
                                                                >
                                                                    Edit Review
                                                                </button>
                                                                <button
                                                                    className="btn btn-danger ms-2"
                                                                    onClick={() =>
                                                                        handleDeleteReview(
                                                                            review
                                                                        )
                                                                    }
                                                                >
                                                                    Delete Review
                                                                </button>
                                                            </>
                                                        )}
                                                </div>
                                            </div>
                                            {isDeleteModalOpen &&
                                                activeReviewId ===
                                                review.id && (
                                                    <div>
                                                        <DeleteReview
                                                            onConfirm={
                                                                handleConfirmDelete
                                                            }
                                                            onCancel={
                                                                handleCancelDelete
                                                            }
                                                        />
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="tab-content mt-3" id="nav-tabContent">
                <div
                    className="tab-pane fade show mt-3"
                    id="nav-photos"
                    role="tabpanel"
                    aria-labelledby="nav-photos-tab"
                    tabIndex="0"
                >
                    <div className="container">Photos</div>
                </div>
            </div>
            <div className="tab-content mt-3" id="nav-tabContent">
                <div
                    className="tab-pane fade show mt-3"
                    id="nav-following"
                    role="tabpanel"
                    aria-labelledby="nav-following-tab"
                    tabIndex="0"
                >
                    <div className="container">Following</div>
                </div>
            </div>
            <div className="tab-content mt-3" id="nav-tabContent">
                <div
                    className="tab-pane fade show mt-3"
                    id="nav-followers"
                    role="tabpanel"
                    aria-labelledby="nav-followers-tab"
                    tabIndex="0"
                >
                    <div className="container">Followers
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListMyReviews;
