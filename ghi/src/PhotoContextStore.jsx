import React, { createContext, useState, useContext, useCallback } from 'react';

const RestaurantPhotosContext = createContext();

export const RestaurantPhotosProvider = ({ children }) => {
    const [photos, setPhotos] = useState({});

    const fetchPhotos = useCallback(async (placeId) => {
        if (!photos[placeId]) {
            try {
                const response = await fetch(`http://localhost:8000/api/restaurants/${placeId}/photos`);
                if (!response.ok) {
                    throw new Error('Could not fetch restaurant photos');
                }
                const data = await response.json();
                setPhotos((currentPhotos) => ({
                    ...currentPhotos,
                    [placeId]: data
                }));
            } catch (error) {
                console.error(error);
            }
        }
    }, [photos]);

    return (
        <RestaurantPhotosContext.Provider value={{ photos, fetchPhotos }}>
            {children}
        </RestaurantPhotosContext.Provider>
    );
};

export const useRestaurantPhotos = () => useContext(RestaurantPhotosContext);
