
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import useToken from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}



const GetMyReviews = () => {
    const [username, setUsername] = useState("")
    const [reviews, setReviews] = useState([])
    const { token } = useAuthContext()
    console.log("username: ", username)

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

    useEffect(() => {
        handleFetchWithAPI();
    }, [token]);

    const fetchMyReviews = async () => {
        try {
            const url = `${tokenUrl}/api/accounts/${username}/reviews`;
            fetch(url, {
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("review data: ", data)
                    setReviews(data);
                })
            setReviews(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };


    useEffect(() => {
        fetchMyReviews();
    }, [token]);

    return (
        < div >
            <h5>My reviews</h5>
            {/* <div className="list-my-reviews-container">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
            </div> */}
        </div >
    )
}

export default GetMyReviews
