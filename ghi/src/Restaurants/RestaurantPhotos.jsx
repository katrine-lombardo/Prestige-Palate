import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

const RestaurantPhotos = () => {
    const { id } = useParams();
    const [restaurantPhotos, setRestaurantPhotos] = useState(null);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/restaurants/${id}/photos`);
                if (!response.ok) {
                    throw new Error('Could not fetch restaurant photos');
                }
                const data = await response.json();
                setRestaurantPhotos(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPhotos();
    }, [id]);

    if (!restaurantPhotos) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>Google Photos</h2>
            <div>
                <ul style={{
                    listStyle: 'none',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    padding: 0
                }}>
                    {restaurantPhotos.photos.map((photo, index) => (
                        <li key={index} style={{ width: '100%', overflow: 'hidden' }}>
                            <img
                                src={photo.imageUrl}
                                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                                loading="lazy"
                            />
                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                {photo.authorAttributions?.[0]?.photoUri ? (
                                    <p style={{ marginRight: '10px' }}>
                                        <img
                                            src={`https:${photo.authorAttributions?.[0]?.photoUri}`}
                                            alt=""
                                            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
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
