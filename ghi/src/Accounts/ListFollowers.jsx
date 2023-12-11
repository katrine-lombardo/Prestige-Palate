import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Loading from "../Loading";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListFollowers = ({ username }) => {
    const [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchFollowers = async () => {
            if (username) {
                try {
                    const url = `${tokenUrl}/api/accounts/followers/${username}`;
                    const response = await fetch(url, {
                        credentials: "include",
                    });
                    const data = await response.json();
                    const followersWithReviewData = await Promise.all(
                        data.map(async (follower_username) => {
                            try {
                                const reviewUrl = `${tokenUrl}/api/accounts/${follower_username}/reviews`;
                                const reviewResponse = await fetch(reviewUrl);
                                const followerReviewData =
                                    await reviewResponse.json();

                                const totalReviews = followerReviewData.length;
                                const averageRating =
                                    totalReviews > 0
                                        ? followerReviewData.reduce(
                                            (sum, review) =>
                                                sum + review.rating,
                                            0
                                        ) / totalReviews
                                        : 0;

                                return {
                                    follower: follower_username,
                                    profile_icon_url:
                                        followerReviewData.length > 0
                                            ? followerReviewData[0]
                                                .profile_icon_url
                                            : "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
                                    total_reviews: totalReviews,
                                    average_rating: averageRating,
                                };
                            } catch (error) {
                                console.error("Error fetching review:", error);
                                return {
                                    follower: follower_username,
                                    profile_icon_url:
                                        "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
                                    total_reviews: 0,
                                    average_rating: 0,
                                };
                            }
                        })
                    );
                    setFollowers(followersWithReviewData);
                    setIsLoading(false);
                } catch (error) {
                    console.error("Fetch error:", error);
                    setError(error.message);
                    setIsLoading(false);
                }
            }
        };
        fetchFollowers();
    }, [token, username]);

    if (isLoading) {
        return <Loading />;
    }

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

    const renderNullFollowers = () => (
        <div>
            <div className="container mt-3">
                {isLoading ? (
                    <Loading />
                ) : (
                    "No followers here. Yet..."
                )}
            </div>
        </div>
    );

    return (
        <div>
            <div className="followers-list">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {followers.length > 0
                        ? followers.map((follower, index) => (
                            <div key={index} className="col">
                                <div className="follower-card">
                                    <div className="card h-90">
                                        <div className="card-body mt-4">
                                            <Link to={`/accounts/${follower.follower}`}>
                                                <img
                                                    src={
                                                        follower.profile_icon_url ||
                                                        "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                                                    }
                                                    alt={follower.follower}
                                                    className="user-icon mb-3"
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
                                                <h5 className="card-title text-center mb-4">
                                                    {follower.follower}
                                                </h5>
                                            </Link>
                                            <div className="card-text text-center">
                                                <p>
                                                    Average Rating:{" "}
                                                    {follower.average_rating.toFixed(
                                                        1
                                                    )}
                                                </p>
                                                <div>
                                                    {[1, 2, 3, 4, 5].map(
                                                        (star) => (
                                                            <span
                                                                key={star}
                                                                style={{
                                                                    color:
                                                                        star <=
                                                                            follower.average_rating
                                                                            ? "gold"
                                                                            : "gray",
                                                                }}
                                                            >
                                                                ★
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                                <p>
                                                    Total Reviews:{" "}
                                                    {follower.total_reviews}
                                                </p>
                                                <button
                                                    type="button"
                                                    className="btn btn-light"
                                                    onClick={() =>
                                                        handleFollow(
                                                            follower.follower
                                                        )
                                                    }
                                                >
                                                    <small>
                                                        + Follow{" "}
                                                        {follower.follower}
                                                    </small>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        : renderNullFollowers()}
                </div>
            </div>
        </div>
    );
};

export default ListFollowers;
