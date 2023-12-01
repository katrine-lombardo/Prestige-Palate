import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {

    return (
        <div className="restaurant-card">
            <Link to={`/restaurants/${restaurant.id}`} className="restaurant-link">
                <h3>{restaurant.displayName.text}</h3>
                <p>{restaurant.formattedAddress}</p>
                <p>Rating: {restaurant.rating}({restaurant.userRatingCount} rating)</p>
            </Link>
        </div>
    );
};

export default RestaurantCard;
