import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

const ReviewCard = ({ review }) => {
    const { username, place_id, id, text, rating } = review;
    const [restaurantDetails, setRestaurantDetails] = useState([])
    const [restaurantName, setRestaurantName] = useState("")

    useEffect(() => {
        const fetchRestaurantDetails = async () => {
            try {
                const url = `${tokenUrl}/api/restaurants/${place_id}`
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Could not fetch restaurant details');
                }
                const data = await response.json();
                setRestaurantDetails(data);
                setRestaurantName(data.displayName.text)
            } catch (error) {
                console.error(error);
            }
        };

        fetchRestaurantDetails();
    }, []);

    return (
        <div className="review-card">
            <Link to={`/accounts/${username}/reviews`} className="reviews-link">
                <h3>{restaurantName}</h3>
            </Link>
            <p>Rating: {rating}</p>
            <p>Review: {text}</p>
        </div>
    );
};

export default ReviewCard;
