import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import RestaurantCard from './RestaurantCard';
import Loading from '../Loading';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
}

const FavoriteRestaurants = () => {
    const [favorites, setFavorites] = useState([]);
    const [detailedFavorites, setDetailedFavorites] = useState([]);
    const [sortKey, setSortKey] = useState('nameAsc');
    const [filterCity, setFilterCity] = useState('');
    const [filterState, setFilterState] = useState('');
    const [filterRating, setFilterRating] = useState('');
    const [filterName, setFilterName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const { token } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = `My Favorite Restaurants  ·  Prestige Palate`;
    }, []);

    const sortedAndFilteredFavorites = () => {
        return detailedFavorites
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

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedAndFilteredFavorites().slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedAndFilteredFavorites().length / itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [filterCity, filterState, sortKey, itemsPerPage]);

    useEffect(() => {
        const fetchFavorites = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${tokenUrl}/api/user/favorites`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch favorites');
                }
                const favoriteIds = await response.json();
                setFavorites(favoriteIds);
            } catch (error) {
                console.error('Error fetching favorites:', error);
            }
            setIsLoading(false);
        };
        fetchFavorites();
    }, [token]);

    useEffect(() => {
        const fetchFavoriteDetails = async () => {
            setIsLoading(true);
            if (favorites.length === 0) {
                setIsLoading(false);
                return;
            }

            try {
                const details = await Promise.all(
                    favorites.map(fav =>
                        fetch(`${tokenUrl}/api/restaurants/${fav.place_id}`, {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }).then(res => (res.ok ? res.json() : Promise.reject(res)))
                    )
                );
                setDetailedFavorites(details);
            } catch (error) {
                console.error('Failed to fetch favorite details', error);
            }
            setIsLoading(false);
        };

        fetchFavoriteDetails();
    }, [favorites, token]);


    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0); 
    };

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

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="container mt-4">
            <h2>My Favorite Restaurants</h2>
            <div className="row mb-3">
                <nav>
                    <div className="col-md-6">
                        <label>Restaurants per page: </label>
                        <select className="form-control d-inline-block w-auto ml-2" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </div>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => changePage(page)}>{page}</button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="col-md-6">
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
                <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
            ))}
            {currentItems.length === 0 && <div className="alert alert-warning">No favorite restaurants found.</div>}
            <nav>
                <ul className="pagination justify-content-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => changePage(page)}>{page}</button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );

};

export default FavoriteRestaurants;
