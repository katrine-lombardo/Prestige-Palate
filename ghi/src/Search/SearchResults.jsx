import React from 'react';
import RestaurantCard from '../Restaurants/RestaurantCard';

function SearchResults({ results }) {
    const hasResults = results && results.length > 0;

    return (
        <div>
            {hasResults ? (
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
