import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../ContextStore';

const RestaurantCard = ({ restaurant, onToggleFavorite, showFavorite, onRemoveFavorite }) => {
    const { favorites } = useStore();
    const isAlreadyFavorite = favorites.includes(restaurant.id);
    let city, state, country;

    if (restaurant.formattedAddress) {
        const addressParts = restaurant.formattedAddress.split(', ');
        city = addressParts.length > 2 ? addressParts[1] : null;
        state = addressParts.length > 2 ? addressParts[2].split(' ')[0] : null;
        country = addressParts.length > 2 ? addressParts[3] : null;
    }

    const handleFavoriteClick = () => {
        onToggleFavorite(restaurant.id);
    };

    return (
        <div className="restaurant-card">
            <Link to={`/restaurants/${restaurant.id}`} className="restaurant-link">
                <h3>{restaurant.displayName.text}</h3>
            </Link>
                <p>{restaurant.formattedAddress}</p>
                <p>{city}</p>
                <p>{state}</p>
                <p>{country}</p>
                <p>Rating: {restaurant.rating} ({restaurant.userRatingCount} ratings)</p>
            
            {showFavorite && (
                <div className="switch">
                    <input
                        type="checkbox"
                        id={`favorite-toggle-${restaurant.id}`}
                        checked={isAlreadyFavorite}
                        onChange={handleFavoriteClick}
                    />
                    <label htmlFor={`favorite-toggle-${restaurant.id}`} className="slider round"></label>
                </div>
            )}
            {onRemoveFavorite && (
                <button onClick={onRemoveFavorite} className="remove-favorite-btn">Remove from Favorites</button>
            )}
        </div>
    );
};

export default RestaurantCard;
