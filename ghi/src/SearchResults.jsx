// SearchResults.jsx
import React from 'react';

function SearchResults({ results }) {
    return (
        <div>
            {/* {results && results.restaurants.map((restaurant, index) => ( */}
            {results.map((restaurant, index) => (
                <div key={index}>
                    <h3>{restaurant.displayName.text}</h3>
                    <p>{restaurant.formattedAddress}</p>
                    {/* Add other restaurant details here */}
                </div>
            ))}
        </div>
    );
}

export default SearchResults;
