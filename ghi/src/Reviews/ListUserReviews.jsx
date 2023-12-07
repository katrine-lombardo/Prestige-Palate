import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import ListFollowers from "../Accounts/ListFollowers";
import ListFollowing from "../Accounts/ListFollowing";
import PhotoCard from "./PhotoCard";
import Loading from "../Loading";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListUserReviews = () => {
    const { username } = useParams();
    const [reviews, setReviews] = useState([]);
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUserReviews = async () => {
            setIsLoading(true);
            const url = `${tokenUrl}/api/accounts/${username}/reviews`;

            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())

                .then(async (data) => {
                    console.log(data)
                    const reviewsWithRestaurantNames = await Promise.all(
                        data.map(async (review) => {
                            const restaurantUrl = `${tokenUrl}/api/restaurants/${review.place_id}`;
                            const restaurantResponse = await fetch(restaurantUrl);
                            const restaurantData = await restaurantResponse.json();
                            return { ...review, restaurantName: restaurantData.displayName.text };
                        })
                    );
                    setReviews(reviewsWithRestaurantNames);
                    setIsLoading(false);
                })
                .catch((error) => console.error(error));
        };
        fetchUserReviews();
    }, [username]);

    const handleFollow = async (followerUsername) => {
        try {
            const followUrl = `${tokenUrl}/api/accounts/follow/`;
            const response = await fetch(followUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    following_username: followerUsername,
                }),
            });

            if (response.ok) {
                console.log(`You are now following ${followerUsername}`);
            } else {
                console.error(`Failed to follow ${followerUsername}`);
            }
        } catch (error) {
            console.error("Error following:", error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    const renderNullReviews = () => {
        return <div>
            <div className="container mt-4">
                No Prestige Palate reviews by this user, yet...
            </div>
        </div>;
    };

    return (
        <div>
            <div className="container mb-4">
                <div className="row">
                    <div className="col-1">
                        <img
                            src={reviews.length > 0 ? reviews[0].profile_icon_url : 'default-profile-icon-url'}
                            alt="User"
                            className="user-icon"
                            style={{
                                width: '40px',
                                height: '40px',
                                border: '2px solid black',
                                borderRadius: '50%',
                                padding: '2px',
                                objectFit: 'cover',
                                margin: 'auto',
                                display: 'block',
                            }}
                        />
                    </div>
                    <div className="col-7">
                        <h3>{username}'s Prestigious Palate</h3>
                        <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => handleFollow(username)}
                        >
                            <small>+ Follow {username}</small>
                        </button>
                    </div>
                </div>
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
                                                <div className="col">
                                                    <div className="row"></div>
                                                    <div className="row"></div>
                                                </div>
                                                <div className="col">
                                                    <div className="row"></div>
                                                    <div className="row"></div>
                                                </div>
                                                <div className="card-title">
                                                    <Link to={`/restaurants/${review.place_id}`}>
                                                        <h4>{review.restaurantName}</h4>
                                                    </Link>
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
                        <div className="container">
                            <PhotoCard key={username} username={username} />
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
                        <ListFollowing username={username} />
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
                        <ListFollowers username={username} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ListUserReviews;
