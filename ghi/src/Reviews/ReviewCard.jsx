import React from 'react';
import { Link } from 'react-router-dom';

const ReviewCard = ({ review }) => {

    return (
        <div className="review-card">
            <Link to={`/accounts/${review.username}/reviews`} className="reviews-link">
                <h3>Restaurant place_id: {review.place_id}</h3>
                <p>Review id: {review.id}</p>
                <p>Review: {review.text}</p>
                <p>Rating: {review.rating}</p>
            </Link>
        </div>
    );
};

export default ReviewCard;
