import React, { useState, useEffect } from 'react';
import RestaurantCard from './RestaurantCard';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import Map from '../Map';

const ListRestaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchRestaurants = async () => {
            const response = await fetch('http://localhost:8000/api/restaurants', {
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
            <Map restaurants={restaurants} viewport={location_data.viewport} />
            {restaurants.length > 0 ? (
                restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.place_id} restaurant={restaurant} />
                ))
            ) : (
                <p>No restaurants found.</p>
            )}
        </div>
    );
};

export default ListRestaurants;
