import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    // You can add more props as needed, like onAddToFavorites callback if you want to handle it here

    return (
        <div className="restaurant-card">
            <Link to={`/restaurants/${restaurant.id}`} className="restaurant-link">
                <h3>{restaurant.displayName.text}</h3>
                <p>{restaurant.formattedAddress}</p>
                <p>Rating: {restaurant.rating}</p>
            </Link>
            {/* Additional restaurant details can be added here */}
        </div>
    );
};

export default RestaurantCard;
