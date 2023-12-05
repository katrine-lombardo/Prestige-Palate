import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

const ListAppReviews = () => {
    const { place_id } = useParams();
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const { token } = useAuthContext();

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

    const promptLogin = (message) => {
        const confirmLogin = window.confirm(`${message} Please login to continue.`);
        if (confirmLogin) {
            navigate('/login');
        }
    };

    const addReview = () => {
        if (!token) {
            promptLogin("Only logged-in users can add reviews.");
            return;
        }
        navigate(`/create-review/${place_id}`);
    };

    if (reviews.length === 0) {
        return (
            <div className="container text-center">
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
        )
    }

    return (
        <div>
            <div className="container mt-3">
                <div>
                    {reviews.map((review, index) => {
                        return (
                            <div key={index} className="card border-0">
                                <div className="card-body">
                                    <div className="card-title">
                                        <div className="d-flex justify-content-between">
                                            <Link to={`/accounts/${review.username}`}>
                                                <h5>{review.username}</h5>
                                            </Link>
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
                                        <blockquote className="blockquote">
                                            <p>{review.title}</p>
                                        </blockquote>
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
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default ListAppReviews;
