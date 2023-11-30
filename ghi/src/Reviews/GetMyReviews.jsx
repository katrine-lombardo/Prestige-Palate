import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import ReviewCard from './ReviewCard';

const GetMyReviews = () => {
    const [username, setUsername] = useState("")
    const [reviews, setReviews] = useState([])
    const { token } = useAuthContext();
    console.log("username: ", username)
    console.log("token: ", token)

    useEffect(() => {
        fetchMyReviews();
    }, [token]);

    const fetchUsername = async () => {
        const response = await fetch("http://localhost:8000/token", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                //token
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                username: email,
                first_name: firstName,
                last_name: lastName,
            }),
        })
        const data = await response.json();
        setUsername(data)
        if (!response.ok) {
            throw new Error('Cannot fetch username, or User is not logged in');
        }
        console.log("Data: ", data)
    }

    useEffect(() => {
        fetchUsername();
    }, []);

    const fetchMyReviews = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/accounts/${username}/reviews`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Cannot fetch username, or User is not logged in');
            }
            const data = await response.json();
            setReviews(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    return (
        < div >
            <h5>My reviews</h5>
            <div className="list-my-reviews-container">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
            </div>
        </div >
    )
}

export default GetMyReviews
