import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import DeleteReview from "./DeleteReview";
import ListFollowers from "../Accounts/ListFollowers";
import ListFollowing from "../Accounts/ListFollowing";
import { useStore } from "../ContextStore";
import Loading from "../Loading";
import "./../index.css";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const ListMyReviews = () => {
    const [username, setUsername] = useState("");
    const [reviews, setReviews] = useState([]);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const navigate = useNavigate();
    const [activeReviewId, setActiveReviewId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuthContext();
    const { favorites, setFavorites } = useStore();

    useEffect(() => {
        const handleFetchWithAPI = async () => {
            setIsLoading(true);
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
                try {
                    const response = await fetch(url, {
                        credentials: "include",
                    });

                    if (response.ok) {
                        const data = await response.json();
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
                    } else {
                        console.error(
                            "Error fetching reviews:",
                            response.statusText
                        );
                    }
                } catch (error) {
                    console.error("Error fetching reviews:", error);
                } finally {
                    setIsLoading(false); // Move it inside the finally block
                }
            }
        };

        handleFetchWithAPI();
        fetchMyReviews();
    }, [token, username]);

    const isFavorite = favorites.includes(reviews.place_id);
    const toggleFavorite = async () => {
        if (!token) {
            setShowLoginPrompt(true);
            return;
        }

        const method = isFavorite ? "DELETE" : "POST";
        try {
            const response = await fetch(
                `${tokenUrl}/api/restaurants/${reviews.place_id}/favorite`,
                {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                const updatedFavorites = isFavorite
                    ? favorites.filter((id) => id !== reviews.place_id)
                    : [...favorites, reviews.place_id];
                setFavorites(updatedFavorites);
            } else {
                throw new Error("Failed to update favorites");
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!reviews) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const handleEditReview = (review) => {
        setActiveReviewId(null);
        navigate(`/update-review/${review.id}`);
    };

    const renderNullPhotos = () => (
        <div>
            <div className="container mt-4">
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="container">
                        <p>No photos here. Yet...</p>
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
                )}
            </div>
        </div>
    );

    const renderNullReviews = () => (
        <div>
            <div className="container mt-4">
                {isLoading ? (
                    <Loading />
                ) : (
                    <div className="container">
                        <p>No Prestige Palate reviews here. Yet...</p>
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
                )}
            </div>
        </div>
    );

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
                setReviews((prevReviews) =>
                    prevReviews.filter((review) => review.id !== activeReviewId)
                );
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

    return (
        <div>
            <div className="container mb-4">
                <h3>My Prestigious Palate</h3>
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
                            <div className="container mt-3">
                                {reviews.map((review, index) => (
                                    <div key={index} className="card border-0">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <div className="d-flex justify-content-between">
                                                    <Link
                                                        to={`/restaurants/${review.place_id}`}
                                                    >
                                                        <h4>
                                                            {review.restaurantName}
                                                        </h4>
                                                    </Link>
                                                    <div
                                                        className="switch"
                                                        style={{
                                                            alignSelf: "center",
                                                        }}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            id={`favorite-toggle-detail-${review.place_id}`}
                                                            checked={isFavorite}
                                                            onChange={
                                                                toggleFavorite
                                                            }
                                                        />
                                                        <label
                                                            htmlFor={`favorite-toggle-detail-${review.place_id}`}
                                                            className="slider round"
                                                        ></label>
                                                    </div>
                                                </div>

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
                                                <div className="review-photos">
                                                    {Array.isArray(
                                                        review.photo_urls
                                                    ) &&
                                                        review.photo_urls.length >
                                                        0 ? (
                                                        review.photo_urls.map(
                                                            (
                                                                url,
                                                                photoIndex
                                                            ) => (
                                                                <img
                                                                    key={
                                                                        photoIndex
                                                                    }
                                                                    src={url}
                                                                    alt={`Photo by ${username}`}
                                                                />
                                                            )
                                                        )
                                                    ) : (
                                                        <p>
                                                            <small>
                                                                <em>
                                                                    No photos
                                                                    attached to
                                                                    this review
                                                                </em>
                                                            </small>
                                                        </p>
                                                    )}
                                                </div>
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
                    <div className="container mt-3">
                        <div className="photo-grid">
                            {reviews.length > 0
                                ? reviews.map((review, index) => (
                                    <div key={index} className="photo-item">
                                        {Array.isArray(review.photo_urls) &&
                                            review.photo_urls.length > 0 ? (
                                            <div className="photo-card">
                                                {review.photo_urls.map(
                                                    (url, photoIndex) => (
                                                        <div key={photoIndex}>
                                                            <img
                                                                src={url}
                                                                alt={`Photo by ${username}`}
                                                            />
                                                            <Link
                                                                to={`/restaurants/${review.place_id}`}
                                                            >
                                                                <h4>
                                                                    {
                                                                        review.restaurantName
                                                                    }
                                                                </h4>
                                                            </Link>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        ) : (
                                            renderNullPhotos()
                                        )}
                                    </div>
                                ))
                                : renderNullPhotos()}
                        </div>
                    </div>
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
                    <div className="container">
                        <ListFollowing username={username} />
                    </div>
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
                    <div className="container">
                        <ListFollowers username={username} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListMyReviews;
