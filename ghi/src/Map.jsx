import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindow, MarkerF } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const Map = ({ restaurants, viewport }) => {
    const navigate = useNavigate();
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const defaultCenter = { lat: -3.745, lng: -38.523 };

    const [mapCenter, setMapCenter] = useState(defaultCenter);

    useEffect(() => {
        if (viewport) {
            setMapCenter({
                lat: (viewport.northeast.lat + viewport.southwest.lat) / 2,
                lng: (viewport.northeast.lng + viewport.southwest.lng) / 2
            });
        }
    }, [viewport]);

    const handleInfoWindowClick = (placeId) => {
        navigate(`/restaurants/${placeId}`);
    };

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={mapCenter}
            zoom={10}
        >
            {restaurants.map((restaurant) => (
                <MarkerF
                    key={restaurant.id}
                    position={{
                        lat: restaurant.location.latitude,
                        lng: restaurant.location.longitude
                    }}
                    onClick={() => setSelectedRestaurant(restaurant)}
                />
            ))}
            {selectedRestaurant && (
                <InfoWindow
                    position={{
                        lat: selectedRestaurant.location.latitude,
                        lng: selectedRestaurant.location.longitude
                    }}
                    onCloseClick={() => setSelectedRestaurant(null)}
                >
                    <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                        <h2 onClick={() => handleInfoWindowClick(selectedRestaurant.id)}>
                            {selectedRestaurant.displayName.text}
                        </h2>
                        <p>{selectedRestaurant.formattedAddress}</p>
                        <p>Rating: {selectedRestaurant.rating}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Map;
