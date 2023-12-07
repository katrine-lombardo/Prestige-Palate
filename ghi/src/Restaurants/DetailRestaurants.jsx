import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import About from './About';
import ListAppReviews from '../Reviews/ListAppReviews';
import RestaurantPhotos from './RestaurantPhotos';
import BigStarCard from './StarCardBig';
import StarCard from './StarCard';
import { useStore } from '../ContextStore';

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
    const { favorites, setFavorites } = useStore();
    const [showLoginPrompt, setShowLoginPrompt] = useState(false);
    const [showEditReviewModal, setShowEditReviewModal] = useState(false);
    const [existingReviewId, setExistingReviewId] = useState(null);

    useEffect(() => {
        fetchDetails(place_id);
    }, [place_id]);

    const fetchDetails = async (id) => {
        const tokenUrl = import.meta.env.VITE_APP_API_HOST || 'default_api_host';
        try {
            const response = await fetch(`${tokenUrl}/api/restaurants/${id}`);
            if (!response.ok) {
                throw new Error('Could not fetch restaurant details');
            }
            const data = await response.json();
            setRestaurantDetails(data);
        } catch (error) {
            console.error(error);
        }
    };

    const isFavorite = favorites.includes(place_id);

    const toggleFavorite = async () => {
        if (!token) {
            setShowLoginPrompt(true);
            return;
        }

        const method = isFavorite ? 'DELETE' : 'POST';
        const tokenUrl = import.meta.env.VITE_APP_API_HOST || 'default_api_host';
        try {
            const response = await fetch(`${tokenUrl}/api/restaurants/${place_id}/favorite`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.ok) {
                const updatedFavorites = isFavorite
                    ? favorites.filter(id => id !== place_id)
                    : [...favorites, place_id];
                setFavorites(updatedFavorites);
            } else {
                throw new Error("Failed to update favorites");
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
        }
    };

    const promptLogin = (message) => {
        setShowLoginPrompt(true);
    };

    const handleClose = () => setShowLoginPrompt(false);
    const handleLogin = () => {
        navigate('/login');
        setShowLoginPrompt(false);
    };

    const handleTabChange = (newActiveTab) => {
        setActiveTab(newActiveTab);
    };

    const handleAddReview = async () => {
        if (!token) {
            setShowLoginPrompt(true);
        } else {
            const data = await checkExistingReview();

            if (data && data.hasExistingReview) {
                setExistingReviewId(data.reviewId);
                setShowEditReviewModal(true);
            } else {
                navigate(`/create-review/${place_id}`);
            }
        }
    };

    const checkExistingReview = async () => {
        try {
            const response = await fetch(`${tokenUrl}/api/restaurants/${place_id}/reviews/check-existing`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.hasExistingReview && data.reviewId) {
                    setExistingReviewId(data.reviewId);
                    setShowEditReviewModal(true);
                    return data;
                } else {
                    setExistingReviewId(null);
                    setShowEditReviewModal(false);
                    return data;
                }
            } else {
                console.error('Server responded with an error when checking for existing review');
                return null;
            }
        } catch (error) {
            console.error('Error checking for existing review:', error);
            return null;
        }
    };

    const navigateToEditReview = () => {
        if (existingReviewId) {
            navigate(`/update-review/${existingReviewId}`);
        } else {
            console.error('No existing review ID found');
        }
        setShowEditReviewModal(false);
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
                <div className="switch">
                    <input
                        type="checkbox"
                        id={`favorite-toggle-detail-${place_id}`}
                        checked={isFavorite}
                        onChange={toggleFavorite}
                    />
                    <label htmlFor={`favorite-toggle-detail-${place_id}`} className="slider round"></label>
                </div>
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
                    <li key={index} className="card border-0">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-2">
                                    <div>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span key={star} style={{ color: star <= review.rating ? "gold" : "gray", }}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-10">
                                    <div className="d-flex justify-content-between">
                                        <div className="card-title">
                                            <blockquote className="blockquote">Google Review Title</blockquote>
                                        </div>
                                        <p className="card-subtitle mb-1 text-body-secondary">
                                            <small>Date Posted: {new Date(review.publishTime).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-2 ">
                                    <img src={review.authorAttribution?.photoUri} className="mr-3 rounded-circle" alt="Author" style={{ width: '40px', height: '40px' }} />
                                    <h5 className="mt-0 mb-1">
                                        <a href={review.authorAttribution?.uri} target="_blank" rel="noopener noreferrer">
                                            {review.authorAttribution?.displayName || 'Unknown Author'}
                                        </a>
                                    </h5>
                                </div>
                                <div className="col-10">
                                    <div className="card-text">
                                        <p>{review.text?.text || "No review text available"}</p>
                                    </div>
                                </div>
                            </div>
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
            <div className={`modal ${showLoginPrompt ? 'show' : ''}`} tabIndex="-1" style={{ display: showLoginPrompt ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Login Required</h5>
                            <button type="button" className="btn-close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <p>Only logged-in users can add to favorites. Please login to continue.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
            {showEditReviewModal && existingReviewId && (
            <div className={`modal ${showEditReviewModal ? 'show' : ''}`} tabIndex="-1" style={{ display: showEditReviewModal ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Review</h5>
                            <button type="button" className="btn-close" onClick={() => setShowEditReviewModal(false)}></button>
                        </div>
                        <div className="modal-body">
                            <p>You have already reviewed this restaurant. Would you like to edit your review?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={navigateToEditReview}>
                                Edit Review
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => setShowEditReviewModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </div>
    );

};

export default DetailRestaurant;
