import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListFollowers = ({ username }) => {
    const [followers, setFollowers] = useState([]);
    const [followerReviewData, setFollowerReviewData] = useState({});
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
                    console.log("data: ", data);

                    const reviewsWithFollowerData = await Promise.all(
                        data.map(async (follower_username) => {
                            try {
                                const reviewUrl = `${tokenUrl}/api/accounts/${follower_username}/reviews`;
                                const reviewResponse = await fetch(reviewUrl);
                                const followerReviewData = await reviewResponse.json();
                                return {
                                    follower: follower_username,
                                    profile_icon_url: followerReviewData.profile_icon_url,
                                };
                            } catch (error) {
                                console.error("Error fetching review:", error);
                                return {
                                    follower: follower_username,
                                    profile_icon_url: null, // Set a default value or handle the error as needed
                                };
                            }
                        })
                    );
                    setFollowers(reviewsWithFollowerData);
                    console.log("reviews with follower data: ", reviewsWithFollowerData)
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
                {followers.length > 0
                    ? followers.map((follower, index) => (
                        <div key={index} className="follower-card">
                            <div className="row row-cols-1 row-cols-md-3 g-4">
                                <div className="col">
                                    <div className="card h-100">
                                        <div className="card-body">
                                            <h5 className="card-title">{follower.follower}</h5>
                                            {/* <img src={follower.profile_icon_url} alt={follower.follower_username} /> */}
                                            <p>{follower.profile_icon_url}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : renderNullFollowers()}
            </div>
        </div >
    );
};

export default ListFollowers;
