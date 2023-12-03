import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { Link } from 'react-router-dom';
import ReviewCard from './ReviewCard';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

const ListAppReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            const url = `${tokenUrl}/api/restaurants/${place_id}/reviews`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("review data: ", data)
                    setReviews(data);
                })
                .catch((error) => console.error(error))
        };
        fetchReviews();
    });

    if (!reviews) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div>
            <h5>Reviews</h5>
            <div className="list-my-reviews-container">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                ) : (
                    <p>Loading reviews...</p>
                )}
            </div>
        </div>
    );

}

export default ListAppReviews
