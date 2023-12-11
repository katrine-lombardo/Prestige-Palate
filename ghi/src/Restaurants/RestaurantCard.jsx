import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../ContextStore';
import StarCard from './StarCard';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import Loading from '../Loading';

const RestaurantCard = ({ restaurant, onToggleFavorite, showFavorite, onRemoveFavorite }) => {
    const { favorites } = useStore();
    const { token } = useAuthContext();
    const isAlreadyFavorite = favorites.includes(restaurant.id);
    const [photoUrl, setPhotoUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    let city, state, country;

    if (restaurant.formattedAddress) {
        const addressParts = restaurant.formattedAddress.split(', ');
        city = addressParts.length > 2 ? addressParts[1] : null;
        state = addressParts.length > 2 ? addressParts[2].split(' ')[0] : null;
        country = addressParts.length > 2 ? addressParts[3] : null;
    }

    const handleFavoriteClick = () => {
        onToggleFavorite(restaurant.id);
    };

    useEffect(() => {
        const fetchPhotos = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/restaurants/${restaurant.id}/photos`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Could not fetch restaurant photos');
                }
                const data = await response.json();
                if (data.photos && data.photos.length > 0) {
                    setPhotoUrl(data.photos[0].imageUrl);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
        }
        };

        fetchPhotos();
    }, [restaurant.id, token]);

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4" style={{ position: 'relative', height: '200px' }}>
                    {isLoading ? (
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <Loading />
                        </div>
                    ) : photoUrl ? (
                        <img src={photoUrl} alt={restaurant.displayName.text} className="img-fluid" style={{ height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div>Image</div>
                    )}
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title d-flex justify-content-between align-items-center">
                            <Link to={`/restaurants/${restaurant.id}`}>
                                {restaurant.displayName.text}
                            </Link>
                            {showFavorite && (
                                <div className="form-check form-switch">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`favorite-toggle-${restaurant.id}`}
                                        checked={isAlreadyFavorite}
                                        onChange={handleFavoriteClick}
                                        role="switch"
                                    />
                                </div>
                            )}
                        </h5>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <StarCard rating={restaurant.rating} />
                            <p style={{ marginLeft: '20px', marginBottom: '0', display: 'flex', alignItems: 'center' }}>
                                Rating {restaurant.rating} ({restaurant.userRatingCount})
                            </p>
                        </div>
                        <p className="card-text">{`${city}, ${state}, ${country}`}</p>
                        <p>{restaurant.formattedAddress}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
