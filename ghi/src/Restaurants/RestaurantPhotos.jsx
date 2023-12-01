import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

const RestaurantPhotos = () => {
    const { id } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/restaurants/${id}`);
                if (!response.ok) {
                    throw new Error('Could not fetch restaurant details');
                }
                const data = await response.json();
                setRestaurantDetails(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDetails();
    }, [id]);

    if (!restaurantDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Photos from Google</h3>
            <div>
                <ul style={{
                    listStyle: 'none',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    padding: 0
                }}>
                    {restaurantDetails.photos.map((photo, index) => (
                        <li key={index} style={{ width: '100%', overflow: 'hidden' }}>
                            <img
                                src={photo.imageUrl}
                                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                                loading="lazy"
                            />
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '3px' }}>
                                {photo.authorAttributions?.[0]?.photoUri ? (
                                    <p style={{ marginRight: '10px' }}>
                                        <img
                                            src={`https:${photo.authorAttributions?.[0]?.photoUri}`}
                                            alt=""
                                            style={{ width: '40px', height: 'auto' }}
                                            loading="lazy"
                                        />
                                    </p>
                                ) : (
                                    <p>No image available</p>
                                )}
                                <p>
                                    <a href={`https:${photo.authorAttributions?.[0]?.uri}`} target="_blank" rel="noopener noreferrer">
                                        {photo.authorAttributions?.[0]?.displayName || 'Unknown Author'}
                                    </a>
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RestaurantPhotos;
