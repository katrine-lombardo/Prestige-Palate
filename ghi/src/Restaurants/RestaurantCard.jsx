import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    const addressParts = restaurant.formattedAddress.split(', ');
    const city = addressParts.length > 2 ? addressParts[1] : null;
    const state = addressParts.length > 2 ? addressParts[2].split(' ')[0] : null;
    const country = addressParts.length > 2 ? addressParts[3] : null;
    return (
        <div className="restaurant-card">
            <Link to={`/restaurants/${restaurant.place_id}`} className="restaurant-link">
                <h3>{restaurant.displayName.text}</h3>
                <p>{restaurant.formattedAddress}</p>
                <p>{city}</p>
                <p>{state}</p>
                <p>{country}</p>
                <p>Rating: {restaurant.rating}({restaurant.userRatingCount} rating)</p>
            </Link>
        </div>
    );
};

export default RestaurantCard;
