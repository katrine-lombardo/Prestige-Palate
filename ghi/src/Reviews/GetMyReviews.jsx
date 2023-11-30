
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import UserDataCard from '../Accounts/UserDataCard';
import useToken from "@galvanize-inc/jwtdown-for-react";

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw error("VITE_APP_API_HOST was undefined.")
}
const [userData, setUserData] = useState("");
const { fetchWithCookie } = useToken();

const handleFetchWithAPI = async () => {
    const url = `${tokenUrl}/token`;
    fetch(url, {
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data.account);
            setUserData(data);
        })
        .catch((error) => console.error(error));
};

const handleFetchWithJFR = async (e) => {
    e.preventDefault();
    const data = await fetchWithCookie(
        `${process.env.REACT_APP_USER_SERVICE_API_HOST}/token`
    );
    console.log(data);
    setUserData(data);
};


const GetMyReviews = () => {
    const [username, setUsername] = useState('')
    const [reviews, setReviews] = useState([])
    const { token } = useAuthContext();
    console.log("username: ", username)
    console.log("token: ", token)

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch(`${tokenUrl}/token`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
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
