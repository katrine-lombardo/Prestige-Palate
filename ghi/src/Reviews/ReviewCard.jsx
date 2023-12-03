import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

const ReviewCard = ({ review }) => {
    const { username, place_id, publish_time, text, rating } = review;
    const [restaurantName, setRestaurantName] = useState("")
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const url = `${tokenUrl}/api/restaurants/${place_id}`
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Could not fetch restaurant details');
                }
                const data = await response.json();
                setRestaurantName(data.displayName.text)
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchRestaurantDetails();
    }, []);

    if (loading) {
        return <p>Loading review...</p>;
    }

    return (
        <div className="review-card">
            <Link to={`/restaurants/${place_id}`} className="restaurant-details-link">
                <h3>{restaurantName}</h3>
            </Link>
            <p>Review Author: {username}</p>
            <p>Review Date: {new Date(publish_time).toLocaleDateString()}</p>
            <p>Rating: {rating}</p>
            <p>Review: {text}</p>
        </div>
    );
};

export default ReviewCard;
