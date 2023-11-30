
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import UserDataCard from '../Accounts/UserDataCard';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}

const GetMyReviews = () => {
    const [username, setUsername] = useState('')
    const [reviews, setReviews] = useState([])
    const { token } = useAuthContext();
    console.log("username: ", username)
    console.log("token: ", token)


    const fetchUsername = async () => {
        console.log("fetchUsername function is being called");
        try {
            const response = await fetch(`${tokenUrl}/token`, {
                headers: {
                    "Content-Type": "application/json",
                    //token
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Cannot fetch username, or User is not logged in');
            }
            const data = await response.json();
            console.log("Data from response:", data);
            setUsername(data);
            // console.log("Username set to:", data.account.username);
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    }
    useEffect(() => {
        fetchUsername();
    }, [token]);




    // useEffect(() => {
    //     fetchMyReviews();
    // }, [token]);


    // const fetchMyReviews = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:8000/api/accounts/${username}/reviews`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         if (!response.ok) {
    //             throw new Error('Cannot fetch username, or User is not logged in');
    //         }
    //         const data = await response.json();
    //         setReviews(data);
    //         console.log(data)
    //     } catch (error) {
    //         console.error('Error fetching reviews:', error);
    //     }
    // };

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
