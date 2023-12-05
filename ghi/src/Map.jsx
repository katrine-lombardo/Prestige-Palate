import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const Map = ({ restaurants, viewport }) => {
    console.log("viewport: ", viewport)
    console.log("restaurants: ", restaurants)
    const navigate = useNavigate();
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const mapRef = useRef(null);
    const defaultCenter = { lat: -3.745, lng: -38.523 };

    const handleInfoWindowClick = (placeId) => {
        navigate(`/restaurants/${placeId}`);
    };

    const onLoad = (map) => {
        mapRef.current = map;
    };

    useEffect(() => {
        if (viewport && mapRef.current) {
            console.log('Setting viewport bounds:', viewport);
            const bounds = new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(viewport.southwest.lat, viewport.southwest.lng),
                new window.google.maps.LatLng(viewport.northeast.lat, viewport.northeast.lng)
            );
            mapRef.current.fitBounds(bounds);
        }
    }, [viewport]);

    return (
        <GoogleMap
            onLoad={onLoad}
            mapContainerStyle={containerStyle}
            center={viewport ? undefined : defaultCenter}
        >
            {restaurants.map((restaurant) => (
                restaurant.location?.latitude && restaurant.location?.longitude && (
                    <Marker
                        key={restaurant.id}
                        position={{
                            lat: restaurant.location?.latitude,
                            lng: restaurant.location?.longitude
                        }}
                        onClick={() => setSelectedRestaurant(restaurant)}
                    />
                )
            ))}

            {selectedRestaurant && (
                <InfoWindow
                    position={{
                        lat: selectedRestaurant.location.latitude,
                        lng: selectedRestaurant.location.longitude
                    }}
                    onCloseClick={() => setSelectedRestaurant(null)}
                >
                    <div
                        style={{ textAlign: 'center', cursor: 'pointer' }}

                    >
                        <h2
                            onClick={() => handleInfoWindowClick(selectedRestaurant.id)}
                        >{selectedRestaurant.displayName.text}</h2>
                        <p>{selectedRestaurant.formattedAddress}</p>
                        <p>Rating: {selectedRestaurant.rating}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Map;
