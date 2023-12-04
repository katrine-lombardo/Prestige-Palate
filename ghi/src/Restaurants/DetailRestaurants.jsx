import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { Link } from 'react-router-dom';
import About from './About';
import ListAppReviews from '../Reviews/ListAppReviews';
import RestaurantPhotos from './RestaurantPhotos';
import BigStarCard from './StarCardBig';
import StarCard from './StarCard';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

const DetailRestaurant = () => {
    const { place_id } = useParams();
    const navigate = useNavigate();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const { token } = useAuthContext();
    const [activeTab, setActiveTab] = useState('reviews');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`${tokenUrl}/api/restaurants/${place_id}`);
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
    }, [place_id]);

    // const fetchPhoto = async (photoId) => {
    //     try {
    //         const response = await fetch(`${tokenUrl}/api/restaurants/${photoId}/photos`);
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

    const handleTabChange = (newActiveTab) => {
        setActiveTab(newActiveTab);
    };

    const addToFavorites = async () => {
        if (!token) {
            promptLogin("Only logged-in users can add to favorites.");
            return;
        }

        try {
            const response = await fetch(`${tokenUrl}/api/restaurants/${place_id}/favorite`, {
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
        navigate(`/create-review/${place_id}`);
    };


    if (!restaurantDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="restaurant-detail-container">
            <h1 style={{ marginBottom: '20px' }}>{restaurantDetails.displayName.text}</h1>
            <div className="actions">
                <button onClick={addReview}
                    style={{ marginRight: '5px' }}>Add a Review</button>
                <button onClick={addToFavorites}>Add to Favorites</button>
            </div>
            <p />
            <h4>Rating: {restaurantDetails.rating}({restaurantDetails.userRatingCount})</h4>
            <p />
            <BigStarCard rating={restaurantDetails.rating} />
            <p />
            {restaurantDetails.websiteUri ? (
                <a
                    href={restaurantDetails.websiteUri}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '18px', marginTop: '10px' }}
                >
                    {restaurantDetails.websiteUri}
                </a>
            ) : null}
            <br />
            <h2>Google Reviews</h2>
            <br />
            <ul style={{ listStyle: 'none' }}>
                {restaurantDetails.reviews.map((review, index) => {
                    const date = new Date(review.publishTime);
                    const formattedDate = date.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });

                    return (
                        <li key={index}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <img
                                        src={review.authorAttribution?.photoUri}
                                        style={{ width: '40px', height: 'auto', marginRight: '10px' }}
                                        loading="lazy"
                                    />
                                    <a href={review.authorAttribution?.uri} target="_blank" rel="noopener noreferrer">
                                        {review.authorAttribution?.displayName || 'Unknown Author'}
                                    </a>
                                </div>
                                <StarCard
                                    rating={review.rating}
                                    style={{ marginLeft: '10px' }}
                                />
                            </div>
                            <p />
                            <p>{review.text.text}</p>
                            <p>Date Posted: {formattedDate}</p>
                            <br />
                        </li>
                    );
                })}
            </ul>

            <div className="tab-menu">
                <button
                    style={{ marginRight: '5px' }}
                    onClick={() => handleTabChange('reviews')}>Reviews</button>
                <button
                    style={{ marginRight: '5px' }}
                    onClick={() => handleTabChange('photos')}>Photos</button>
                <button onClick={() => handleTabChange('about')}>About</button>
            </div>

            {activeTab === 'reviews' && <ListAppReviews place_id={place_id} />}
            {activeTab === 'photos' && <RestaurantPhotos placeId={place_id} />}
            {activeTab === 'about' && <About restaurantDetails={restaurantDetails} />}
        </div>
    );
};

export default DetailRestaurant;
