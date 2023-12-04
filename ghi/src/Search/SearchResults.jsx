import React from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantCard from '../Restaurants/RestaurantCard';

function SearchResults({ }) {
    const location = useLocation();
    const results = location.state?.results || [];

    return (
        <div>
            {results.length > 0 ? (
                results.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))
            ) : (
                <div>No restaurants found.</div>
            )}
        </div>
    );
}

export default SearchResults;
