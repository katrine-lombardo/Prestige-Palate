import React from 'react';
import { Link } from 'react-router-dom';

const ReviewCard = ({ review }) => {
    const { username, place_id, id, text, rating } = review;

    return (
        <div className="review-card">
            <Link to={`/accounts/${username}/reviews`} className="reviews-link">
                <h3>Restaurant place_id: {place_id}</h3>
                <p>Review ID: {id}</p>
                <p>Review: {text}</p>
                <p>Rating: {rating}</p>
            </Link>
        </div>
    );
};

export default ReviewCard;
