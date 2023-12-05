import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantCard from '../Restaurants/RestaurantCard';

function SearchResults() {
    const location = useLocation();
    const initialResults = location.state?.results || [];
    const [results, setResults] = useState(initialResults);
    const [sortKey, setSortKey] = useState('nameAsc');
    const [filterCity, setFilterCity] = useState('');
    const [filterState, setFilterState] = useState('');
    const [filterRating, setFilterRating] = useState('');
    const [filterName, setFilterName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const sortedAndFilteredResults = () => {
        return results
            .filter(restaurant => {
                const addressParts = restaurant.formattedAddress.split(', ');
                const city = addressParts.length > 2 ? addressParts[1] : null;
                const state = addressParts.length > 2 ? addressParts[2].split(' ')[0] : null;
                return (!filterCity || (city && city.toLowerCase().includes(filterCity.toLowerCase()))) &&
                    (!filterState || (state && state.toLowerCase().includes(filterState.toLowerCase()))) &&
                    (!filterRating || restaurant.rating >= filterRating) &&
                    (!filterName || restaurant.displayName.text.toLowerCase().includes(filterName.toLowerCase()));
            })
            .sort((a, b) => {
                switch (sortKey) {
                    case 'highRating':
                        return (b.rating || 0) - (a.rating || 0);
                    case 'lowRating':
                        return (a.rating || 0) - (b.rating || 0);
                    case 'nameAsc':
                        return a.displayName.text.localeCompare(b.displayName.text);
                    case 'nameDesc':
                        return b.displayName.text.localeCompare(a.displayName.text);
                    case 'mostRating':
                        return (b.userRatingCount || 0) - (a.userRatingCount || 0);
                    case 'leastRating':
                        return (a.userRatingCount || 0) - (b.userRatingCount || 0);
                    default:
                        return 0;
                }
            });
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filterCity, filterState, sortKey]);

    const handleSortChange = (e) => {
        setSortKey(e.target.value);
    };

    const handleFilterCityChange = (e) => {
        setFilterCity(e.target.value);
    };

    const handleFilterStateChange = (e) => {
        setFilterState(e.target.value);
    };

    const handleFilterRatingChange = (e) => {
        setFilterRating(e.target.value);
    };

    const handleFilterNameChange = (e) => {
        setFilterName(e.target.value);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedAndFilteredResults().slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedAndFilteredResults().length / itemsPerPage);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <div>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button key={page} onClick={() => changePage(page)} disabled={currentPage === page}>
                        {page}
                    </button>
                ))}
            </div>
            <div>
                <label>Restaurants per page:</label>
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </select>
            </div>
            <div>
                <label>Sort by: </label>
                <select onChange={handleSortChange} value={sortKey}>
                    <option value="highRating">Highest Rating</option>
                    <option value="lowRating">Lowest Rating (Z-A)</option>
                    <option value="nameAsc">Name (A-Z)</option>
                    <option value="nameDesc">Name (Z-A)</option>
                    <option value="mostRating">Most Rating</option>
                    <option value="leastRating">Least Rating</option>
                </select>
                <input type="number" placeholder="Filter by rating" value={filterRating} onChange={handleFilterRatingChange} />
                <input type="text" placeholder="Filter by name" value={filterName} onChange={handleFilterNameChange} />
                <input type="text" placeholder="Filter by city" value={filterCity} onChange={handleFilterCityChange} />
                <input type="text" placeholder="Filter by state" value={filterState} onChange={handleFilterStateChange} />
            </div>

            {currentItems.map(restaurant => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}

            {currentItems.length === 0 && <div>No restaurants found.</div>}

        </div>
    );
}

export default SearchResults;
