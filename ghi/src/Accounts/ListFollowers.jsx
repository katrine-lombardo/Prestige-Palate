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
                const url = `${tokenUrl}/api/accounts/followers/${username}`;
                fetch(url, {
                    credentials: "include",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setFollowers(data);
                        console.log(data)
                        setLoading(false);
                    })
                    .catch(
                        (error) => {
                            console.error("Fetch error: ", error);
                            setError(error.message);
                        }
                    );
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
                                            <h5 className="card-title">{follower}</h5>
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
