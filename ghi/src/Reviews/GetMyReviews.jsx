
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import ReviewCard from './ReviewCard';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

const GetMyReviews = () => {
    const [username, setUsername] = useState("")
    const [reviews, setReviews] = useState([])
    const { token } = useAuthContext()

    useEffect(() => {
        const handleFetchWithAPI = async () => {
            const url = `${tokenUrl}/token`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("username: ", data.account.username);
                    setUsername(data.account.username);
                })
                .catch((error) => console.error(error));
        };
        handleFetchWithAPI();
    }, [token]);

    useEffect(() => {
        const fetchMyReviews = async () => {
            const url = `${tokenUrl}/api/accounts/${username}/reviews`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("review data: ", data)
                    setReviews(data);
                })
                .catch((error) => console.error(error))
        };
        fetchMyReviews();
    }, [token]);

    return (
        <div>
            <h5>{username}'s reviews</h5>
            <div className="list-my-reviews-container">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                ) : (
                    <p>Loading reviews...</p>
                )}
            </div>
        </div>
    );
}

export default GetMyReviews
