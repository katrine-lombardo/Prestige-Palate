import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

const ListRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchRestaurants = async () => {
            // Fetch restaurants based on the criteria you want (e.g., all restaurants, search results, or favorites)
            // This is just a placeholder URL, adjust it according to your API endpoint
            const response = await fetch('http://localhost:8000/restaurants', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setRestaurants(data);
        };

        fetchRestaurants();
    }, [token]);

    return (
        <div className="list-restaurants-container">
            {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))
            ) : (
                <p>No restaurants found.</p>
            )}
        </div>
    );
};

export default ListRestaurants;
