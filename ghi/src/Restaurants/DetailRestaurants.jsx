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
            <p>{restaurantDetails.formattedAddress}</p>
            <p>Rating: {restaurantDetails.rating}({restaurantDetails.userRatingCount})</p>
            <p>website: {restaurantDetails.website}</p>
            <p>international Phone Number: {restaurantDetails.internationalPhoneNumber}</p>
            <h3>Reviews from Google</h3>
            <div className="actions">
                <button onClick={addReview}>Add a Review</button>
                <button onClick={addToFavorites}>Add to Favorites</button>
            </div>
        </div>
    );
};

export default DetailRestaurant;
