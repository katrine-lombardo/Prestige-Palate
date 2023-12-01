import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';

const DetailRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    // const fetchPhoto = async (photoId) => {
    //     try {
    //         const response = await fetch(`http://localhost:8000/api/restaurants/${photoId}/photos`);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const blob = await response.blob();
    //         return URL.createObjectURL(blob);
    //     } catch (error) {
    //         console.error("Fetching photo failed:", error);
    //         return ''; // Fallback image URL or empty string
    //     }
    // };

    // const handleImageLoad = async (photoName, event) => {
    //     const photoSrc = await fetchPhoto(photoName);
    //     event.target.src = photoSrc;
    // };

    const promptLogin = (message) => {
        const confirmLogin = window.confirm(`${message} Please login to continue.`);
        if (confirmLogin) {
            navigate('/login');
        }
    };

    const addToFavorites = async () => {
        if (!token) {
            promptLogin("Only logged-in users can add to favorites.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/restaurants/${id}/favorite`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.status === 'success') {
                alert('Added to favorites!');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Error adding to favorites:', error);
            alert('Failed to add to favorites.');
        }
    };


    const addReview = () => {
        if (!token) {
            promptLogin("Only logged-in users can add reviews.");
            return;
        }
        navigate(`/restaurants/${id}/create-review`);
    };


    if (!restaurantDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="restaurant-detail-container">
                <h1>{restaurantDetails.displayName.text}</h1>
                <p>Address: {restaurantDetails.formattedAddress}</p>
                <p>Rating: {restaurantDetails.rating}({restaurantDetails.userRatingCount})</p>
                {restaurantDetails.websiteUri && (
                    <p>
                        <a href={restaurantDetails.websiteUri} target="_blank" rel="noopener noreferrer">
                            {restaurantDetails.websiteUri}
                        </a>
                    </p>
                )}
                <p>International Phone Number: {restaurantDetails.internationalPhoneNumber}</p>
                <h3>Reviews from Google</h3>
                <ul>
                    {restaurantDetails.reviews.map((review, index) => {
                        const date = new Date(review.publishTime);
                        const formattedDate = date.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        });

                        return (
                            <li key={index}>
                                <p>Author: {review.authorAttribution.displayName}</p>
                                <p>Rating: {review.rating}</p>
                                <p>Review: {review.text?.text || 'No review available'}</p>
                                <p>Date Posted: {formattedDate}</p>
                            </li>
                        );
                    })}
                </ul>
                <h3>Prestigious Palate Reviews</h3>
                <div className="actions">
                    <button onClick={addReview}>Add a Review</button>
                    <button onClick={addToFavorites}>Add to Favorites</button>
                </div>
                <br></br>
                <br></br>
                <h3>Photos from Google</h3>
            </div>
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

export default DetailRestaurant;
