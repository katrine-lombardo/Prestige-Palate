import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { Link } from 'react-router-dom';
import About from './About';
import ListAppReviews from '../Reviews/ListAppReviews';
import RestaurantPhotos from './RestaurantPhotos';

const DetailRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const { token } = useAuthContext();
    const [activeTab, setActiveTab] = useState('reviews');

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

    const handleTabChange = (newActiveTab) => {
        setActiveTab(newActiveTab);
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
        navigate(`/create-review/${id}`);
    };


    if (!restaurantDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="restaurant-detail-container">
            <h1>{restaurantDetails.displayName.text}</h1>
            <div className="actions">
                <button onClick={addReview}>Add a Review</button>
                <button onClick={addToFavorites}>Add to Favorites</button>
            </div>

            <p>Rating: {restaurantDetails.rating}({restaurantDetails.userRatingCount})</p>
            {restaurantDetails.websiteUri ? (
                <a href={restaurantDetails.websiteUri} target="_blank" rel="noopener noreferrer">
                    {restaurantDetails.websiteUri}
                </a>
            ) : null}
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
                            <p>Review: {review.text.text}</p>
                            <p>Date Posted: {formattedDate}</p>
                        </li>
                    );
                })}
            </ul>

            <div className="tab-menu">
                <button onClick={() => handleTabChange('reviews')}>Reviews</button>
                <button onClick={() => handleTabChange('photos')}>Photos</button>
                <button onClick={() => handleTabChange('about')}>About</button>
            </div>

            {activeTab === 'reviews' && <ListAppReviews placeId={id} />}
            {activeTab === 'photos' && <RestaurantPhotos placeId={id} />}
            {activeTab === 'about' && <About restaurantDetails={restaurantDetails} />}
        </div>
    );
};

export default DetailRestaurant;
