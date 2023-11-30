import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { Link } from 'react-router-dom';

const ListAppReviews = () => {
    const { place_id } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/restaurants/${place_id}/reviews`);
                if (!response.ok) {
                    throw new Error('Could not fetch reviews for this restaurant');
                }
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchReviews();
    });

    if (!reviews) {
        return <div>Loading reviews...</div>;
    }

    return (
        <div className="restaurant-app-review-container">
            <h3>Prestigious Palate Reviews</h3>
            <li></li>
        </div>
    );

}

export default ListAppReviews
