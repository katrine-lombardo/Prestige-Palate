
import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import ReviewCard from './ReviewCard';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

const ListMyReviews = () => {
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
                    console.log("account data: ", data.account);
                    setUsername(data.account.username);
                })
                .catch((error) => console.error(error));
        };

        const fetchMyReviews = async () => {
            if (username) {
                const url = `${tokenUrl}/api/accounts/${username}/reviews`;
                console.log("reviews url: ", url)
                fetch(url, {
                    credentials: "include",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("review data: ", data)
                        setReviews(data);
                    })
                    .catch((error) => console.error(error))
            }
        };
        handleFetchWithAPI();
        fetchMyReviews();
    }, [token, username]);

    return (
        <div>
            <h5>My reviews</h5>
            <div className="list-reviews-container">
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

export default ListMyReviews
