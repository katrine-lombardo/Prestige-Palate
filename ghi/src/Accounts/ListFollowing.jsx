import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListFollowing = ({ username }) => {
    const [following, setFollowing] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchFollowing = async () => {
            if (username) {
                const url = `${tokenUrl}/api/accounts/following/${username}`;
                fetch(url, {
                    credentials: "include",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setFollowing(data);
                        setLoading(false);
                    })
                    .catch(
                        (error) => {
                            console.error(error);
                            setError(error.message);
                        }
                    );
            }
        };
        fetchFollowing();

    }, [username, token]);

    const renderNullFollowing = () => (
        <div>
            <div className="container mt-4">
                {loading ? "Loading following..." : `${username} is not following any palates. Yet...`}
            </div>
        </div>
    );

    return (
        <div>
            <div className="following-list">
                {following.length > 0
                    ? following.map((follower, index) => (
                        <div key={index} className="follower-card">
                            <p>{follower}</p>
                        </div>
                    ))
                    : renderNullFollowing()}
            </div>
        </div>
    );
};

export default ListFollowing;
