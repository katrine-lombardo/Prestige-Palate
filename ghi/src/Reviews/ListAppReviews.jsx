import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListAppReviews = () => {
    const navigate = useNavigate();
    const { place_id } = useParams();
    const { token } = useAuthContext()
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const url = `${tokenUrl}/api/restaurants/${place_id}/reviews`;
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail);
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchReviews();
    }, [place_id]);

    const addReview = () => {
        if (!token) {
            promptLogin("Only logged-in users can add reviews.");
            return;
        }
        navigate(`/create-review/${place_id}`);
    };

    if (!reviews) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div>
            <h5>Reviews</h5>
            <div className="container mt-3">
                {reviews.length > 0 ? (
                    <div className="review-card">
                        <div className="card mt-2">
                            <div className="card-body">
                                <div className="card-title">
                                    <Link
                                        to={`/restaurants/${place_id}`}
                                        className="restaurant-details-link"
                                    >
                                        <h3>{restaurantName}</h3>
                                    </Link>
                                </div>
                                <div className="card-text">
                                    <div className="container">
                                        <div className="d-flex justify-content-between">
                                            <div>{username}</div>
                                            <div>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        style={{
                                                            color:
                                                                star <= rating
                                                                    ? "gold"
                                                                    : "gray",
                                                        }}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <p>{text}</p>
                                    <p className="card-subtitle mb-1 text-body-secondary">
                                        Date posted:{" "}
                                        {new Date(
                                            publish_time
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="container">
                        <div className="container mt-4">
                            No Prestige Palate reviews here. Yet...
                        </div>
                        <div>
                            <button
                                onClick={addReview}
                                style={{ marginRight: "5px" }}
                                type="button"
                                className="btn btn-secondary mt-3 ms-2"
                            >
                                Be the first
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListAppReviews;
