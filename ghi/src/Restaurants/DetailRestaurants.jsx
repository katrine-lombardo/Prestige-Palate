import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { Link } from 'react-router-dom';

const DetailRestaurant = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [restaurantDetails, setRestaurantDetails] = useState(null);
    const { token } = useAuthContext();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/restaurants/${id}`);
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

    const addToFavorites = () => {
        if (!token) {
            promptLogin("Only logged-in users can add to favorites.");
            return;
        }
        // If logged in, add to favorites
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
        <div className="restaurant-detail-container">
            <h1>{restaurantDetails.displayName.text}</h1>
            <p>Address: {restaurantDetails.formattedAddress}</p>
            <p>Rating: {restaurantDetails.rating}({restaurantDetails.userRatingCount})</p>
            {restaurantDetails.websiteUri ? (
                <a href={restaurantDetails.websiteUri} target="_blank" rel="noopener noreferrer">
                    {restaurantDetails.websiteUri}
                    </a>
            ) : null}
            {restaurantDetails.internationalPhoneNumber ? (
                <p>
                    International Phone Number: {restaurantDetails.internationalPhoneNumber}
                </p>
            ) : null}
            {/* <p>International Phone Number: {restaurantDetails.internationalPhoneNumber}</p> */}
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
            <h3>Prestigious Palate Reviews</h3>
            <div className="actions">
                <button onClick={addReview}>Add a Review</button>
                <button onClick={addToFavorites}>Add to Favorites</button>
            </div>
            <h3>Photos from Google</h3>
            restaurantDetails.photos.map((photo, index) => ())

        </div>
    );
};

export default DetailRestaurant;
