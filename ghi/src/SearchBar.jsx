import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchTerm) {
            const url = new URL('http://localhost:8000/api/restaurants');
            url.searchParams.append('location', searchTerm);

            try {
                const response = await fetch(url);

                if (response.ok) {
                    const data = await response.json();
                    const searchResults = data.restaurants.places.length > 0 ? data.restaurants.places : [];
                    onSearch(searchResults);
                } else {
                    onSearch([]);
                }

            } catch (error) {
                console.error("search error:", error)
            }
        } else {
            console.log("None")
        }


    }


    return (
        <form onSubmit={handleSearch}>
            <div className="input-group">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="City, State"
                />
                <button type="submit">Search</button>
            </div>
        </form>
    );
};

export default SearchBar;
