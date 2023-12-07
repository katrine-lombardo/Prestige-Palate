import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.");
}

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (searchTerm) {
            const url = new URL(`${tokenUrl}/api/restaurants`);
            url.searchParams.append('location', searchTerm);

            try {
                const response = await fetch(url);
                setIsLoading(true);
                if (response.ok) {
                    const data = await response.json();

                    const locationData = data.location_data
                    const searchResults = data.restaurants.places.length > 0 ? data.restaurants.places : [];
                    navigate('/search-results', { state: { results: searchResults, locationData: locationData } });
                } else {
                    navigate('/search-results', { state: { results: [], locationData: null } });
                }

            } catch (error) {
                console.error("search error:", error)
                navigate('/search-results', { state: { results: [], locationData: null } });
            }
            setIsLoading(false);
        } else {
            console.log("None")
        }


    }

    if (isLoading) {
        return <Loading />;
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
