// SearchBar.jsx
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (event) => {
        event.preventDefault();
        console.log("Search initiated for:", searchTerm);
        if (searchTerm) {
            // const response = await fetch(`/restaurants/${encodeURIComponent(searchTerm)}`);
            const url = new URL('http://localhost:8000/restaurants');
            url.searchParams.append('location', searchTerm);

            try {
                const response = await fetch(url);


              //  console.log("Requesting URL:", response)
                console.log("Requesting URL:", url.toString());

                if (response.ok) {
                    const data = await response.json();
                    console.log("Search results:", data.restaurants.places);
                    onSearch(data.restaurants.places);
                } else {
                    console.error("error search:", response.statusText)
                }

            } catch (error) {
                console.error("search error:", error)
            }
        } else {
            console.log("None")
        }



        // onSearch(data);
    }


    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Restaurants..."
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
