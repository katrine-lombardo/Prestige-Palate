import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

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
                    navigate('/search-results', { state: { results: searchResults } });
                } else {
                    navigate('/search-results', { state: { results: [] } });
                }

            } catch (error) {
                console.error("search error:", error)
                navigate('/search-results', { state: { results: [] } });
            }
        } else {
            console.log("None")
        }


    }


    return (
        <form onSubmit={handleSearch}>
            <div className="form-outline" data-mdb-input-init>
                <input
                    type="search"
                    id="form1"
                    className="form-control"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search For Your Next Food Adventure by: City, State.."
                    aria-label="Search"
                    style={{ width: '500px' }}
                />
            </div>
        </form>
    );
};

export default SearchBar;