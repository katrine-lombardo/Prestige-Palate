import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListUserReviews = () => {
    const { username } = useParams();
    const [reviews, setReviews] = useState([]);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchUserReviews = async () => {
            const url = `${tokenUrl}/api/accounts/${username}/reviews`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    setReviews(data);
                })
                .catch((error) => console.error(error));
        };
        fetchUserReviews();
    }, [username]);

    const renderNullReviews = () => {
        return <div>
            <div className="container mt-4">
                No Prestige Palate reviews here. Yet...
            </div>
        </div>;
    };

    return (
        <div>

            <div className="container mb-4">
                <h3>{username}'s reviews</h3>
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
                        {!reviews.length ? renderNullReviews() : (
                            <div>
                                {reviews.map((review, index) => {
                                    return (
                                        <div key={index} className="card border-0">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <div className="d-flex justify-content-between">
                                                        <h5>{review.title}</h5>
                                                        <div>
                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                <span key={star} style={{
                                                                    color: star <= review.rating ? "gold" : "gray",
                                                                }}>★</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card-text">
                                                    <p>{review.text}</p>
                                                    <p className="card-subtitle mb-1 text-body-secondary">
                                                        Date posted: {" "}{new Date(review.publish_time).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}</p>
                                                    <p></p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                                }
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-photos"
                    role="tabpanel"
                    aria-labelledby="nav-photos-tab"
                    tabIndex="0"
                >
                    <div className="nav-photos-container">
                        <div className="container mt-4">
                            {username} has not uploaded any photos, yet...
                        </div>
                    </div>
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-following"
                    role="tabpanel"
                    aria-labelledby="nav-following-tab"
                    tabIndex="0"
                >
                    <div className="container mt-4">
                        {username} is not following any palates
                    </div>
                </div>
                <div
                    className="tab-pane fade"
                    id="nav-followers"
                    role="tabpanel"
                    aria-labelledby="nav-followers-tab"
                    tabIndex="0"
                >
                    <div className="container mt-4">
                        No Palates following {username}, yet...
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ListUserReviews;
