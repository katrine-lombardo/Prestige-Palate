import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import Loading from '../Loading';
import './ListAppReviews.css'

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const ListAppReviews = () => {
    const { place_id } = useParams();
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();
    const { token } = useAuthContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const url = `${tokenUrl}/api/restaurants/${place_id}/reviews`;
                const response = await fetch(url);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail);
                }
                const data = await response.json();

                setReviews(data);
                setLoading(false);
            } catch (error) {
                console.error(error.message);
            }
        };
        fetchReviews();
    }, [place_id]);

    const handleAddReview = async () => {
        if (!token) {
            setShowLoginPrompt(true);
        } else {
            {
                navigate(`/create-review/${place_id}`);
            }
        }
    };

    const promptLogin = (message) => {
        const confirmLogin = window.confirm(
            `${message} Please login to continue.`
        );
        if (confirmLogin) {
            navigate("/login");
        }
    };

    const renderStars = (rating) => (
        <div className="star-rating" style={{ fontSize: "23px" }}>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    style={{
                        color: star <= rating ? "gold" : "gray",
                    }}
                >
                    ★
                </span>
            ))}
        </div>
    );

    const renderReview = (review, index) => (
        <div key={index} className="card border-0 mb-3">
            <div className="card-body">
                <div className="row align-items-start">
                    <div className="col-2">
                        <img
                            src={review.profile_icon_url}
                            alt="User"
                            className="user-icon"
                        />
                        <h5 className="mt-2">
                            <Link to={`/accounts/${review.username}`}>
                            {review.username}
                        </Link>
                        </h5>
                    </div>
                    <div className="col-10">
                        <div className="d-flex justify-content-between">
                            <div className="card-title">
                                <blockquote className="blockquote">
                                    <div>{review.title}</div>
                                </blockquote>
                            </div>
                            <div className="card-subtitle mb-1 text-body-secondary">
                                <small>
                                    {new Date(review.publish_time).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </small>
                                {renderStars(review.rating)}
                            </div>
                        </div>
                        <div className="card-text text-start">
                            <p>{review.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <Loading />;
    }

    if (reviews.length === 0) {
        return (
            <div className="container">
                <div className="container mt-4">
                    No Prestige Palate reviews here. Yet...
                </div>
                <div>
                    <button
                        onClick={handleAddReview}
                        style={{ marginRight: "5px" }}
                        type="button"
                        className="btn btn-secondary mt-3 ms-2"
                    >
                        Be the first
                    </button>
                </div>
            </div>
        );
    }

    return <div className="container mt-4">{reviews.map(renderReview)}</div>;
};

export default ListAppReviews;
