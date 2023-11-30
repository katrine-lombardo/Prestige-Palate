import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import RestaurantCard from './RestaurantCard';

const FavoriteRestaurants = () => {
    const [favorites, setFavorites] = useState([]);
    const [sortKey, setSortKey] = useState('cityAsc');
    const [filterCity, setFilterCity] = useState('');
    const { token } = useAuthContext();

    useEffect(() => {
        fetchFavorites();
    }, [token, sortKey, filterCity]);

    const handleSortChange = (e) => {
        setSortKey(e.target.value);
    };

    const handleFilterCityChange = (e) => {
        setFilterCity(e.target.value);
    };

    const fetchFavorites = async () => {
        try {
            const response = await fetch('http://localhost:8000/user/favorites', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch favorites');
            }
            const data = await response.json();
            setFavorites(data);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const sortedAndFilteredFavorites = () => {
        return favorites
            .filter(fav => filterCity ? fav.city === filterCity : true)
            .sort((a, b) => {
                switch (sortKey) {
                    case 'cityAsc':
                        return a.city.localeCompare(b.city);
                    case 'cityDesc':
                        return b.city.localeCompare(a.city);
                    case 'mostAdded':
                        return b.count - a.count;
                    case 'leastAdded':
                        return a.count - b.count;
                    case 'addedTime':
                        return new Date(b.addedTime) - new Date(a.addedTime);
                    default:
                        return 0;
                }
            });
    };

    return (
        <div className="favorite-restaurants-container">
            <h2>My Favorite Restaurants</h2>
            <div>
                <label>Sort by: </label>
                <select onChange={handleSortChange} value={sortKey}>
                    <option value="cityAsc">City (A-Z)</option>
                    <option value="cityDesc">City (Z-A)</option>
                    <option value="mostAdded">Most Added</option>
                    <option value="leastAdded">Least Added</option>
                    <option value="addedTime">Recently Added</option>
                </select>
                <input
                    type="text"
                    placeholder="Filter by city"
                    value={filterCity}
                    onChange={handleFilterCityChange}
                />
            </div>
            {sortedAndFilteredFavorites().length > 0 ? (
                sortedAndFilteredFavorites().map((favorite) => (
                    <RestaurantCard key={favorite.place_id} restaurant={favorite} />
                ))
            ) : (
                <p>You have no favorite restaurants.</p>
            )}
        </div>
    );
};

export default FavoriteRestaurants;
