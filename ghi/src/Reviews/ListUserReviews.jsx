import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import { useStore } from "../ContextStore";
import ListFollowers from "../Accounts/ListFollowers";
import ListFollowing from "../Accounts/ListFollowing";
import NullContent from "./NullContent";
import PhotoCard from "./PhotoCard";
import Loading from "../Loading";
import "./../index.css";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const ListUserReviews = () => {
    const { username } = useParams();
    const [usernameExists, setUsernameExists] = useState(false);
    const [reviews, setReviews] = useState([]);
    const { token } = useAuthContext();
    const { favorites, setFavorites } = useStore();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const checkUsernameExists = async () => {
            try {
                const url = `${tokenUrl}/api/accounts/`;
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error: The status is ${response.status}`);
                }
                const accounts = await response.json();
                const userExists = accounts.some(account => account.username === username);
                setUsernameExists(userExists);
            } catch (error) {
                console.error('Error checking username:', error);
            }
        };
        checkUsernameExists();
    }, [username]);

    useEffect(() => {
        setIsLoading(true);
        if (usernameExists) {
            const fetchUserReviews = async () => {
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
                                    restaurantName: restaurantData.displayName.text,
                                };
                            })
                        );
                        setReviews(reviewsWithRestaurantNames);
                    })
                    .catch((error) => console.error(error));
            };
            fetchUserReviews();
        }
        setIsLoading(false)
    }, [username, usernameExists]);

    const toggleFavorite = async (place_id) => {
        if (!token) {
            setShowLoginPrompt(true);
            return;
        }

        const method = favorites.includes(place_id) ? "DELETE" : "POST";
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
                const updatedFavorites = favorites.includes(place_id)
                    ? favorites.filter((id) => id !== place_id)
                    : [...favorites, place_id];
                setFavorites(updatedFavorites);
            } else {
                throw new Error("Failed to update favorites");
            }
        } catch (error) {
            console.error("Error updating favorites:", error);
        }
    };

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

    const renderNullPhotos = () => {
        if (isLoading) {
            < Loading />
        } else {
            return (
                <NullContent
                    message="No Prestige Palate photos here. Yet..."
                    isLoading={isLoading}
                    showButton={false}
                />
            )
        }
    };

    const renderNullReviews = () => {
        if (isLoading) {
            < Loading />
        } else {
            return (
                <NullContent
                    message="No Prestige Palate reviews here. Yet..."
                    isLoading={isLoading}
                    showButton={false}
                />
            )
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!usernameExists) {
        return (
            <div className="container mt-5">
                <p>{username} is not a member of Prestige Palate.</p>
            </div>
        );
    }

    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div>
                <div className="container mb-4">
                    <div className="row">
                        <div className="col-1">
                            <img
                                src={
                                    reviews.length > 0
                                        ? reviews[0].profile_icon_url
                                        : "default-profile-icon-url"
                                }
                                alt="User"
                                className="user-icon"
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    border: "2px solid black",
                                    borderRadius: "50%",
                                    padding: "2px",
                                    objectFit: "cover",
                                    margin: "auto",
                                    display: "block",
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
                <div className="tab-content mt-3" id="nav-reviews-tab">
                    <div
                        className="tab-pane fade show active mt-3"
                        id="nav-reviews"
                        role="tabpanel"
                        aria-labelledby="nav-reviews-tab"
                        tabIndex="0"
                    >
                        <div className="container mt-3">
                            {reviews.length === 0 ? (
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
                                                                {
                                                                    review.restaurantName
                                                                }
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
                                                                checked={favorites.includes(
                                                                    review.place_id
                                                                )}
                                                                onChange={() =>
                                                                    toggleFavorite(
                                                                        review.place_id
                                                                    )
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
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="tab-content mt-3" id="nav-photos-tab">
                    <div
                        className="tab-pane fade show mt-3"
                        id="nav-photos"
                        role="tabpanel"
                        aria-labelledby="nav-photos-tab"
                        tabIndex="0"
                    >
                        <div className="container mt-3">
                            {!reviews.length ? (
                                renderNullPhotos()
                            ) : (
                                <div className="container">
                                    <PhotoCard key={username} username={username} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="tab-content mt-3" id="nav-following-tab">
                    <div
                        className="tab-pane fade show mt-3"
                        id="nav-following"
                        role="tabpanel"
                        aria-labelledby="nav-following-tab"
                        tabIndex="0"
                    >
                        <div className="container mt-3">
                            <ListFollowing username={username} />
                        </div>
                    </div>
                </div>
                <div className="tab-content mt-3" id="nav-followers-tab">
                    <div
                        className="tab-pane fade show mt-3"
                        id="nav-followers"
                        role="tabpanel"
                        aria-labelledby="nav-followers-tab"
                        tabIndex="0"
                    >
                        <div className="container mt-3">
                            <ListFollowers username={username} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ListUserReviews;
