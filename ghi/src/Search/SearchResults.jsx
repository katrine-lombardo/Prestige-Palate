import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RestaurantCard from '../Restaurants/RestaurantCard';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import Map from '../Map';
import { useStore } from '../ContextStore';

function SearchResults() {
    const { token } = useAuthContext();
    const location = useLocation();
    const initialResults = location.state?.results || [];
    const locationData = location.state?.locationData;
    const [results, setResults] = useState(initialResults);
    const [sortKey, setSortKey] = useState('nameAsc');
    const [filterCity, setFilterCity] = useState('');
    const [filterState, setFilterState] = useState('');
    const [filterRating, setFilterRating] = useState('');
    const [filterName, setFilterName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const { favorites, setFavorites } = useStore();

    const tokenUrl = import.meta.env.VITE_APP_API_HOST;
    if (!tokenUrl) {
        throw error("VITE_APP_API_HOST was undefined.")
    }

    // useEffect(() => {
    //     setResults(location.state?.results || []);
    // }, [location.state]);


    const fetchFavorites = async () => {
        if (!token) {
            setFavorites([]);
            return;
        }

        try {
            const response = await fetch(`${tokenUrl}/api/user/favorites`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.ok) {
                const favoriteData = await response.json();
                setFavorites(favoriteData.map(fav => fav.place_id));
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const toggleFavorite = async (restaurantId) => {
        if (!token) {
            return;
        }

        const isFavorite = favorites.includes(restaurantId);
        const method = isFavorite ? 'DELETE' : 'POST';
        const url = `${tokenUrl}/api/restaurants/${restaurantId}/favorite`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                let updatedFavoritesList;
                if (isFavorite) {
                    updatedFavoritesList = favorites.filter(id => id !== restaurantId);
                } else {
                    updatedFavoritesList = [...favorites, restaurantId];
                }
                setFavorites(updatedFavoritesList);

            } else {
                throw new Error("Failed to update favorites");
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

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
            <Map
                key={location.pathname}
                restaurants={initialResults}
                viewport={locationData?.viewport}
            />

            <div className="container mt-4">
                <div className="row mb-3">
                    <div className="col">
                        <label>Restaurants per page: </label>
                        <select className="form-control d-inline-block w-auto ml-2" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => changePage(page)}>{page}</button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="col">
                        <label>Sort by: </label>
                        <select className="form-control d-inline-block w-auto ml-2" onChange={handleSortChange} value={sortKey}>
                            <option value="highRating">Highest Rating</option>
                            <option value="lowRating">Lowest Rating</option>
                            <option value="nameAsc">Name (A-Z)</option>
                            <option value="nameDesc">Name (Z-A)</option>
                            <option value="mostRating">Most Rating</option>
                            <option value="leastRating">Least Rating</option>
                        </select>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="number" className="form-control" placeholder="Filter by rating" value={filterRating} onChange={handleFilterRatingChange} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Filter by name" value={filterName} onChange={handleFilterNameChange} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Filter by city" value={filterCity} onChange={handleFilterCityChange} />
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Filter by state" value={filterState} onChange={handleFilterStateChange} />
                    </div>
                </div>
                {currentItems.map(restaurant => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        isFavorite={favorites.includes(restaurant.id)}
                        onToggleFavorite={toggleFavorite}
                        showFavorite={!!token} />
                ))}
                {currentItems.length === 0 && <div className="alert alert-warning">No restaurants found.</div>}
            </div>
        </div>
    );

}

export default SearchResults;
