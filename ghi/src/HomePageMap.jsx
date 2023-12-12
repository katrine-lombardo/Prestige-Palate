import React, { useRef, useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, MarkerF } from '@react-google-maps/api';
import markerData from './HomePageMarkers';
import { useNavigate } from 'react-router-dom';
import './HomePageMap.css';

const containerStyle = {
    width: '100%',
    height: '80vh',
    position: 'relative',
};

const defaultCenter = { lat: 20, lng: 5 };

const Map = () => {
    const navigate = useNavigate();
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [showOverlay, setShowOverlay] = useState(true);
    const mapRef = useRef(null);

    const handleOverlayClick = () => {
        setShowOverlay(false);
    };

    const handleInfoWindowClick = (placeId) => {
        navigate(`/restaurants/${placeId}`);
    };

    const handleClick = (placeId) => {
        ;
        setSelectedRestaurant(null);
    };

    const onLoad = (map) => {
        mapRef.current = map;
    };

    useEffect(() => {
        if (mapRef.current && markerData.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            markerData.forEach((restaurant) => {
                if (restaurant.latitude && restaurant.longitude) {
                    bounds.extend(
                        new window.google.maps.LatLng(
                            parseFloat(restaurant.latitude),
                            parseFloat(restaurant.longitude)
                        )
                    );
                }
            });
            mapRef.current.fitBounds(bounds);
        }
    }, [markerData]);

    return (
        <GoogleMap
            className="map"
            onLoad={onLoad}
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            options={{ mapTypeControl: false }}
            zoom={1.7}
            onClick={() => handleClick(selectedRestaurant?.placesId)}
        >
            {showOverlay && (
                <div className="overlay-container" onClick={handleOverlayClick}>
                    <div className="overlay-content">
                        <h2>START YOUR PRESTIGE PALATE ADVENTURE</h2>
                        <p className="small-text">click here to get started</p>
                    </div>
                </div>
            )}

            {markerData.map((restaurant) => (
                restaurant.latitude &&
                restaurant.longitude && (
                    <MarkerF
                        key={restaurant.placesId}
                        position={{
                            lat: parseFloat(restaurant.latitude),
                            lng: parseFloat(restaurant.longitude),
                        }}
                        onClick={() => setSelectedRestaurant(restaurant)}
                    />
                )
            ))}

            {selectedRestaurant && (
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedRestaurant.latitude),
                        lng: parseFloat(selectedRestaurant.longitude)
                    }}
                    onCloseClick={() => setSelectedRestaurant(null)}
                >
                    <div style={{ textAlign: 'center', cursor: 'pointer' }}>
                        <h2
                            onClick={() => handleInfoWindowClick(selectedRestaurant.placesId)}
                        >
                            {selectedRestaurant.name}
                        </h2>
                        <p>{selectedRestaurant.city}, {selectedRestaurant.country}</p>
                        <p>Rank: {selectedRestaurant.rank}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default Map;