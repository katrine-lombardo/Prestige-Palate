import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import About from './About';
import ListAppReviews from '../Reviews/ListAppReviews';
import RestaurantPhotos from './RestaurantPhotos';
import { useStore } from '../ContextStore';
import Loading from '../Loading'

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error("VITE_APP_API_HOST was undefined.");
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
    const [isLoading, setIsLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        fetchDetails(place_id);
    }, [place_id]);

    const fetchDetails = async (id) => {
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
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

    const promptLogin = () => {
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


    if (isLoading) {
        return <Loading />;
    }

    if (!restaurantDetails) {
        return <div><Loading /></div>;
    }

    const handleCarouselControl = (increment) => {
        const newIndex = activeIndex + increment * 3;
        setActiveIndex(newIndex < 0 ? restaurantDetails.reviews.length - 1 : newIndex % restaurantDetails.reviews.length);
    };

    return (
        <div className="container text-center mt-4">
            <div className="card border-0 mb-3">
                <div className="row justify-content-evenly">
                    <div className="col-9">
                        <h1 className="mt-1">{restaurantDetails.displayName.text}</h1>
                    </div>
                    <div className="col-2 text-end">
                        <div><small className="text-end">Add to favorites</small></div>
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
                </div>
                <div className="row justify-content-evenly">
                    <div className="col-9">
                        <div className="text-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    style={{
                                        color: star <= restaurantDetails.rating ? "gold" : "gray",
                                        fontSize: '40px'
                                    }}>
                                    ★
                                </span>
                            ))}
                        </div>
                        {restaurantDetails.rating} ({restaurantDetails.userRatingCount} total reviews)
                    </div>
                    <div className="col-2">
                        <div className="text-center m-0">
                            <button className="btn btn-primary mr-2 mt-2" onClick={handleAddReview}>Add a Review</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="google-review-list">
                <div id="review-carousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {restaurantDetails.reviews.map((review, index) => (
                            <div key={index} className={`carousel-item ${index === activeIndex % 3 ? 'active' : ''}`}>
                                <div className="row row-cols-md-3 g-4">
                                    {restaurantDetails.reviews.slice(index, index + 3).map((review, innerIndex) => (
                                        <div key={innerIndex} className="col">
                                            <div className="card h-90">
                                                <div className="card-body mt-1">
                                                    <div className="row text-end">
                                                        <small>{new Date(review.publishTime).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</small>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="card-title text-start mb-4">
                                                            @{review.authorAttribution?.displayName || 'Unknown Author'}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <span className="card-text text-truncate text-start">
                                                            <p>{review.text?.text || "No review text available"}</p>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" onClick={() => handleCarouselControl(-1)}>
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" onClick={() => handleCarouselControl(1)}>
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

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
            {
                showEditReviewModal && existingReviewId && (
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
                )
            }
        </div >
    );
};

export default DetailRestaurant;
