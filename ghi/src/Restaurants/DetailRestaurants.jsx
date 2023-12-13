import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import About from "./About";
import ListAppReviews from "../Reviews/ListAppReviews";
import RestaurantPhotos from "./RestaurantPhotos";
import BigStarCard from "./StarCardBig";
import ReviewCarousel from "./ReviewCarousel";
import { useStore } from "../ContextStore";
import Loading from "../Loading";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const DetailRestaurant = () => {
    const { place_id } = useParams();
    const navigate = useNavigate();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const { token } = useAuthContext();
    const [activeTab, setActiveTab] = useState("reviews");
    const { favorites, setFavorites } = useStore();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const [existingReviewId, setExistingReviewId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showFavoriteModal, setShowFavoriteModal] = useState(false);
    const [favoriteModalMessage, setFavoriteModalMessage] = useState("");

    useEffect(() => {
        if (restaurantDetails) {
            document.title = `${restaurantDetails.displayName.text} · Prestige Palate`;
        }
    }, [restaurantDetails]);

    useEffect(() => {
        fetchDetails(place_id);
    }, [place_id]);

    const fetchDetails = async (id) => {
        try {
            const response = await fetch(`${tokenUrl}/api/restaurants/${id}`);
            if (!response.ok) {
                throw new Error("Could not fetch restaurant details");
            }
            const data = await response.json();
            setRestaurantDetails(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const isFavorite = favorites.includes(place_id);

    const toggleFavorite = async () => {
        if (!token) {
            setShowLoginPrompt(true);
            return;
        }

        const method = isFavorite ? "DELETE" : "POST";
        try {
            const response = await fetch(
                `${tokenUrl}/api/restaurants/${place_id}/favorite`,
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
                    ? favorites.filter((id) => id !== place_id)
                    : [...favorites, place_id];
                setFavorites(updatedFavorites);
                setShowFavoriteModal(true);
                setFavoriteModalMessage(
                    isFavorite ? "Removed from favorites" : "Added to favorites"
                );
            } else {
                throw new Error("Failed to update favorites");
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

    const promptLogin = () => {
        setShowLoginPrompt(true);
    };

    const handleClose = () => setShowLoginPrompt(false);
    const handleLogin = () => {
        navigate("/login");
        setShowLoginPrompt(false);
    };

    const handleTabChange = (newActiveTab) => {
        setActiveTab(newActiveTab);
    };

    const handleAddReview = async () => {
        if (!token) {
            setShowLoginPrompt(true);
        } else {
            const data = await checkExistingReview();

            if (data && data.hasExistingReview) {
                setExistingReviewId(data.reviewId);
                setShowEditReviewModal(true);
            } else {
                navigate(`/create-review/${place_id}`);
            }
        }
    };

    const checkExistingReview = async () => {
        try {
            const response = await fetch(
                `${tokenUrl}/api/restaurants/${place_id}/reviews/check-existing`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.ok) {
                const data = await response.json();
                if (data.hasExistingReview && data.reviewId) {
                    setExistingReviewId(data.reviewId);
                    setShowEditReviewModal(true);
                    return data;
                } else {
                    setExistingReviewId(null);
                    setShowEditReviewModal(false);
                    return data;
                }
            } else {
                console.error(
                    "Server responded with an error when checking for an existing review"
                );
                return null;
            }
        } catch (error) {
            console.error("Error checking for an existing review:", error);
            return null;
        }
    };

    const navigateToEditReview = () => {
        if (existingReviewId) {
            navigate(`/update-review/${existingReviewId}`);
        } else {
            console.error("No existing review ID found");
        }
        setShowEditReviewModal(false);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!restaurantDetails) {
        return (
            <div>
                <Loading />
            </div>
        );
    }

    const { displayName, rating, userRatingCount} =
        restaurantDetails;

    return (
        <main>
            <div
                className="container mt-4"
                style={{
                    border: "1px solid #ddd",
                    borderRadius: "5px",
                    padding: "20px",
                    width: "100%",
                }}
            >
                <div
                    className="restaurant-banner-container"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr auto",
                        gap: "20px",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "20px",
                        width: "100%",
                    }}
                >
                    <div
                        className="restaurant-name"
                        style={{
                            gridColumn: "1",
                            gridRow: "1",
                            fontWeight: "bold",
                            fontSize: "40px",
                        }}
                    >
                        {displayName && displayName.text}
                    </div>
                    <div
                        className="big-star-card"
                        style={{
                            gridColumn: "2",
                            gridRow: "1",
                            textAlign: "right",
                        }}
                    >
                        <BigStarCard rating={rating} />
                    </div>
                    <h4
                        style={{
                            gridColumn: "2",
                            gridRow: "2",
                            textAlign: "right",
                        }}
                    >
                        Rating: {rating} ({userRatingCount})
                    </h4>
                    <div
                        style={{
                            display: "flex",
                            gridColumn: "1 / span 2",
                            justifyContent: "flex-end",
                            gap: "10px",
                            paddingTop: "20px",
                        }}
                    >
                        <button
                            className="btn btn-primary add-review-button"
                            onClick={handleAddReview}
                        >
                            Add a Review
                        </button>
                        <div className="switch" style={{ alignSelf: "center" }}>
                            <input
                                type="checkbox"
                                id={`favorite-toggle-detail-${place_id}`}
                                checked={isFavorite}
                                onChange={toggleFavorite}
                                title={
                                    isFavorite
                                        ? "Remove from favorites"
                                        : "Add to favorites"
                                }
                            />
                            <label
                                htmlFor={`favorite-toggle-detail-${place_id}`}
                                className="slider round"
                            ></label>
                        </div>
                    </div>
                </div>
                <div
                    className={`modal ${showFavoriteModal ? "show" : ""}`}
                    tabIndex="-1"
                    style={{ display: showFavoriteModal ? "block" : "none" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>{favoriteModalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowFavoriteModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "20px" }}></div>

                <ReviewCarousel
                    restaurantDetails={restaurantDetails}
                    style={{ marginTop: "20px" }}
                />

                <div className="nav nav-tabs mt-4" id="nav-tab" role="tablist">
                    <button
                        className={`nav-link ${activeTab === "reviews" ? "active" : ""
                            }`}
                        onClick={() => handleTabChange("reviews")}
                    >
                        Reviews
                    </button>
                    <button
                        className={`nav-link ${activeTab === "photos" ? "active" : ""
                            }`}
                        onClick={() => handleTabChange("photos")}
                    >
                        Photos
                    </button>
                    <button
                        className={`nav-link ${activeTab === "about" ? "active" : ""
                            }`}
                        onClick={() => handleTabChange("about")}
                    >
                        About
                    </button>
                </div>
                <div className="tab-content mt-3">
                    {activeTab === "reviews" && (
                        <ListAppReviews place_id={place_id} />
                    )}
                    {activeTab === "photos" && (
                        <RestaurantPhotos placeId={place_id} />
                    )}
                    {activeTab === "about" && (
                        <About restaurantDetails={restaurantDetails} />
                    )}
                </div>
                <div
                    className={`modal ${showLoginPrompt ? "show" : ""}`}
                    tabIndex="-1"
                    style={{ display: showLoginPrompt ? "block" : "none" }}
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Login Required</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={handleClose}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Only logged-in users can add to favorites.
                                    Please login to continue.
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleLogin}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {showEditReviewModal && existingReviewId && (
                    <div
                        className={`modal ${showEditReviewModal ? "show" : ""}`}
                        tabIndex="-1"
                        style={{
                            display: showEditReviewModal ? "block" : "none",
                        }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit Review</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() =>
                                            setShowEditReviewModal(false)
                                        }
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        You have already reviewed this
                                        restaurant. Would you like to edit your
                                        review?
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={navigateToEditReview}
                                    >
                                        Edit Review
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() =>
                                            setShowEditReviewModal(false)
                                        }
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div style={{ marginTop: "25px" }}></div>
        </main>
    );
};

export default DetailRestaurant;
