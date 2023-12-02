import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { Link } from 'react-router-dom';
import About from './About';
import ListAppReviews from '../Reviews/GetAppReviews';
import RestaurantPhotos from './RestaurantPhotos';
import BigStarCard from './StarCardBig';
import StarCard from './StarCard';

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

            {activeTab === 'reviews' && <ListAppReviews placeId={id} />}
            {activeTab === 'photos' && <RestaurantPhotos placeId={id} />}
            {activeTab === 'about' && <About restaurantDetails={restaurantDetails} />}
        </div>
    );
};

export default DetailRestaurant;
