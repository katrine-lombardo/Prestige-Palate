import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const Dashboard = () => {

    const { token } = useAuthContext();
    const [username, setAccountUsername] = useState("");
    const [icon_id, setIconId] = useState("");
    const [icon_url, setIconUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState([]);
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        document.title = `Dashboard  ·  Prestige Palate`;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountUrl = `${tokenUrl}/token`;
                const accountResponse = await fetch(accountUrl, { credentials: "include" });
                const accountData = await accountResponse.json();
                if (accountData && token) {
                    setAccountUsername(accountData.account.username);
                    const iconUrl = `${tokenUrl}/api/accounts/${accountData.account.id}`;
                    const iconResponse = await fetch(iconUrl, { credentials: "include" });
                    const iconData = await iconResponse.json();

                    const iconsUrl = `${tokenUrl}/api/icons`;
                    const iconsResponse = await fetch(iconsUrl, { credentials: "include" });
                    const iconsData = await iconsResponse.json();

                    setIconId(iconData.profile_icon_id);
                    setIconUrl(iconsData[iconData.profile_icon_id - 1]?.icon_url);
                    setLoading(false);
                }

                if (username) {
                    const followingUrl = `${tokenUrl}/api/accounts/following/${username}`;
                    const followingResponse = await fetch(followingUrl, { credentials: "include" });
                    const followingData = await followingResponse.json();
                    setFollowing(followingData);

                    if (followingData) {
                        const allReviews = [];
                        for (const followedUser of followingData) {
                            const reviewsUrl = `${tokenUrl}/api/accounts/${followedUser}/reviews`;
                            const reviewsResponse = await fetch(reviewsUrl, { credentials: "include" });
                            const reviewsData = await reviewsResponse.json();
                            allReviews.push(reviewsData);
                        }
                        const flattenedReviews = allReviews.flat();
                        const sortedReviews = [...flattenedReviews].sort(
                            (a, b) => new Date(b.publish_time) - new Date(a.publish_time)
                        );
                        setReviews(sortedReviews);

                        if (reviews) {
                            allRestaurants = []
                            for (const review of reviews) {
                                const restaurantUrl = `${tokenUrl}/api/restaurants/${review.place_id}`
                                const restaurantResponse = await fetch(restaurantUrl, { credentials: "include" })
                                const restaurantData = await restaurantResponse.json()
                                allRestaurants.push(restaurantData.displayName.text)
                            }
                        }
                    } else {
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token, username]);


    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div className="text-center">
                <h5 className="card-header">REVIEWS FROM ACCOUNTS I FOLLOW</h5>
                {reviews.map((review) => (
                    <div key={review.id} className="card border-0 mb-3 mx-auto" style={{ maxWidth: '600px' }}>
                        <div className="card-body">
                            <div className="row align-items-start">
                                <div className="col-3">
                                    <img
                                        src={review.profile_icon_url}
                                        alt="User"
                                        className="user-icon"
                                    />
                                    <div>
                                        <Link to={`/accounts/${review.username}`}>
                                            {review.username}
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-9">
                                    <div className="d-flex justify-content-between">
                                        <div className="card-title">
                                            <blockquote className="blockquote">
                                                <p>{review.title}</p>
                                            </blockquote>
                                        </div>
                                        <div>
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <span
                                                    key={star}
                                                    style={{
                                                        color: star <= review.rating ? 'gold' : 'gray',
                                                        fontSize: '2em',
                                                    }}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                            <div>
                                                <small>
                                                    {new Date(review.publish_time).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                    })}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-text text-start">
                                        <p>{review.text}</p>
                                        <div className="review-photos">
                                            {Array.isArray(review.photo_urls) &&
                                                review.photo_urls.length > 0 ? (
                                                review.photo_urls.map((url, photoIndex) => (
                                                    <img
                                                        key={photoIndex}
                                                        src={url}
                                                        alt={`Photo by ${username}`}
                                                        style={{
                                                            maxWidth: '20%',
                                                            height: 'auto',
                                                        }}
                                                    />
                                                ))
                                            ) : (
                                                <p>
                                                    <small>
                                                        <em>No photos attached to this review</em>
                                                    </small>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Dashboard;
