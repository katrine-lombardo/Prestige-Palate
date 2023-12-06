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
        <div className="container mt-4">
            {restaurantDetails && restaurantDetails.displayName &&
                <h1 className="text-center mb-3">{restaurantDetails.displayName.text}</h1>
            }
            <div className="text-center mb-3">
                <button className="btn btn-primary mr-2" onClick={addReview}>Add a Review</button>
                <button className="btn btn-success" onClick={addToFavorites}>Add to Favorites</button>
            </div>

            <BigStarCard rating={restaurantDetails.rating} />
            <h4 className="text-center my-3">Rating: {restaurantDetails.rating} ({restaurantDetails.userRatingCount})</h4>

            {restaurantDetails.websiteUri && (
                <div className="text-center mb-3">
                    <a href={restaurantDetails.websiteUri} target="_blank" rel="noopener noreferrer">
                        {restaurantDetails.websiteUri}
                    </a>
                </div>
            )}
            <h2 className="mt-4">Google Reviews</h2>
            <ul className="list-unstyled mt-3">
                {restaurantDetails && restaurantDetails.reviews && restaurantDetails.reviews.map((review, index) => (
                    <li key={index} className="media my-4">
                        <img src={review.authorAttribution?.photoUri} className="mr-3 rounded-circle" alt="Author" style={{ width: '40px', height: '40px' }} />
                        <div className="media-body">
                            <h5 className="mt-0 mb-1">
                                <a href={review.authorAttribution?.uri} target="_blank" rel="noopener noreferrer">
                                    {review.authorAttribution?.displayName || 'Unknown Author'}
                                </a>
                            </h5>
                            <StarCard rating={review.rating} />
                            <p>{review.text?.text || "No review text available"}</p>
                            <small>Date Posted: {new Date(review.publishTime).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</small>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="nav nav-tabs mt-4" id="nav-tab" role="tablist">
                <button className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => handleTabChange('reviews')}>Reviews</button>
                <button className={`nav-link ${activeTab === 'photos' ? 'active' : ''}`} onClick={() => handleTabChange('photos')}>Photos</button>
                <button className={`nav-link ${activeTab === 'about' ? 'active' : ''}`} onClick={() => handleTabChange('about')}>About</button>
            </div>
            <div className="tab-content mt-3">
                {activeTab === 'reviews' && <ListAppReviews place_id={place_id} />}
                {activeTab === 'photos' && <RestaurantPhotos placeId={place_id} />}
                {activeTab === 'about' && <About restaurantDetails={restaurantDetails} />}
            </div>
        </div>
    );

};

export default DetailRestaurant;
