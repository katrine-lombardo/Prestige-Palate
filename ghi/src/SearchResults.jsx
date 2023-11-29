// SearchResults.jsx
import React from 'react';

function SearchResults({ results }) {
    console.log("Search Results:", results);
    console.log(typeof results);
    const places = results || [];
    console.log("places:", places);
    console.log("Map Function:", places.map);
    return (
        <div className="search-results-container">
            {places.map((place, index) => (
                // {results.map((restaurant.places, index) => (
                <div key={index}>
                    <h3>{place.displayName.text}</h3>
                    <p>{place.formattedAddress}</p>
                    <p>{place.rating}</p>
                    {/* Add other restaurant details here */}
                </div>
            ))}
        </div>
    );
}

export default SearchResults;
