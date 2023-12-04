import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import RestaurantCard from './RestaurantCard';

const FavoriteRestaurants = () => {
    const [favorites, setFavorites] = useState([]);
    const [detailedFavorites, setDetailedFavorites] = useState([]);
    const [sortKey, setSortKey] = useState('cityAsc');
    const [filterCity, setFilterCity] = useState('');
    const [filterState, setFilterState] = useState('');
    const { token } = useAuthContext();


    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/user/favorites', {
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
        };

        fetchFavorites();
    }, [token]);

    useEffect(() => {
        const fetchFavoriteDetails = async () => {
            if (!favorites.length) return;

            try {
                const details = await Promise.all(
                    favorites.map(fav =>
                        fetch(`http://localhost:8000/api/restaurants/${fav.place_id}`, {
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
        };

        fetchFavoriteDetails();
    }, [favorites, token]);



    const handleSortChange = (e) => {
        setSortKey(e.target.value);
    };

    const handleFilterCityChange = (e) => {
        setFilterCity(e.target.value);
    };

    const handleFilterStateChange = (e) => {
        setFilterState(e.target.value);
    };

    const sortedAndFilteredFavorites = () => {
        return detailedFavorites
            .filter(fav => {
                const addressParts = fav.formattedAddress.split(', ');
                const city = addressParts.length > 2 ? addressParts[1] : null;
                const state = addressParts.length > 2 ? addressParts[2].split(' ')[0] : null;
                return (!filterCity || (city && city.toLowerCase().includes(filterCity.toLowerCase()))) &&
                    (!filterState || (state && state.toLowerCase().includes(filterState.toLowerCase())));
            })
            .sort((a, b) => {
                switch (sortKey) {
                    case 'nameAsc':
                        return a.displayName.text.localeCompare(b.displayName.text);
                    case 'nameDesc':
                        return b.displayName.text.localeCompare(a.displayName.text);
                    case 'mostAdded':
                        return (b.userRatingCount || 0) - (a.userRatingCount || 0);
                    case 'leastAdded':
                        return (a.userRatingCount || 0) - (b.userRatingCount || 0);
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
                    <option value="nameAsc">Name (A-Z)</option>
                    <option value="nameDesc">Name (Z-A)</option>
                    <option value="mostAdded">Most Added</option>
                    <option value="leastAdded">Least Added</option>
                </select>
                <input
                    type="text"
                    placeholder="Filter by city"
                    value={filterCity}
                    onChange={handleFilterCityChange}
                />
                <input
                    type="text"
                    placeholder="Filter by state"
                    value={filterState}
                    onChange={handleFilterStateChange}
                />
            </div>
            {sortedAndFilteredFavorites().map(restaurant => (
                <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
            ))}
            {detailedFavorites.length === 0 && (
                <p>You have no favorite restaurants.</p>
            )}
        </div>
    );
};

export default FavoriteRestaurants;
