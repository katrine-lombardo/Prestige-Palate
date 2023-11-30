// SearchResults.jsx
import React from 'react';

function SearchResults({ results }) {
    console.log("Search Results:", results);
    console.log(typeof results);
    const hasResults =results && results.length > 0;
    const places = results || [];
    console.log("places:", places);
    console.log("Map Function:", places.map);
    return (
        <div >
            {hasResults ? (
                results.map((place, index) => (
                    <div key={index}>
                        <h3>{place.displayName.text}</h3>
                        <p>{place.formattedAddress}</p>
                        <p>Rating: {place.rating}</p>
                        {/* Add other restaurant details here */}
                    </div>
                ))
            ) : (
                <div>No restaurants found.</div>
            )}
        </div>
    );
}

export default SearchResults;
