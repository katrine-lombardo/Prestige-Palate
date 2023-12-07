import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListFollowers = ({ username }) => {
    const [followers, setFollowers] = useState([]);
    const [loading, setLoading] = useState(true);
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
                                const followerReviewData = await reviewResponse.json();

                                const totalReviews = followerReviewData.length;
                                const averageRating =
                                    totalReviews > 0
                                        ? followerReviewData.reduce(
                                            (sum, review) => sum + review.rating,
                                            0
                                        ) / totalReviews
                                        : 0;

                                return {
                                    follower: follower_username,
                                    profile_icon_url: followerReviewData.profile_icon_url,
                                    total_reviews: totalReviews,
                                    average_rating: averageRating,
                                };
                            } catch (error) {
                                console.error("Error fetching review:", error);
                                return {
                                    follower: follower_username,
                                    profile_icon_url: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
                                    total_reviews: 0,
                                    average_rating: 0,
                                };
                            }
                        })
                    );
                    setFollowers(followersWithReviewData);
                    setLoading(false);
                } catch (error) {
                    console.error("Fetch error:", error);
                    setError(error.message);
                    setLoading(false);
                }
            }
        };
        fetchFollowers();
    }, [token, username]);

    const renderNullFollowers = () => (
        <div>
            <div className="container mt-4">
                {loading ? "Loading followers..." : "No followers here. Yet..."}
            </div>
        </div>
    );

    return (
        <div>
            <div className="followers-list">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        {followers.length > 0
                            ? followers.map((follower, index) => (
                                <div key={index} className="follower-card">

                                    <div className="card h-90">
                                        <div className="card-body mt-4">
                                            <img
                                                src={follower.profile_icon_url || "https://cdn-icons-png.flaticon.com/512/9131/9131529.png"}
                                                alt={follower.follower}
                                                className="user-icon mb-3"
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
                                            <h5 className="card-title text-center mb-4">{follower.follower}</h5>
                                            <div className="card-text text-center">
                                                <p>Average Rating: {follower.average_rating.toFixed(1)}</p>
                                                <p>Total Reviews: {follower.total_reviews}</p>
                                                <Link to="">
                                                    <button type="button" className="btn btn-light"><small>+ Follow back</small></button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            : renderNullFollowers()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListFollowers;
