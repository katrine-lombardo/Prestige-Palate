import React from 'react';
import { Link } from 'react-router-dom';

function SearchResults({ results }) {
    const places = results || [];
    const hasResults = results && results.length > 0;

    return (
        <div>
            {hasResults ? (
                results.map((place, index) => (
                    <Link to={`/restaurants/${place.id}`} key={index} className="search-result-item">
                        <div>
                            <h3>{place.displayName.text}</h3>
                            <p>{place.formattedAddress}</p>
                            <p>Rating: {place.rating}</p>
                            {/* Add other restaurant details here */}
                        </div>
                    </Link>
                ))
            ) : (
                <div>No restaurants found.</div>
            )}
        </div>
    );
}

export default SearchResults;
