import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import { Link } from 'react-router-dom';

const GetMyReviews = () => {

    const [username, setUsername] = useState("");
    const [reviews, setReviews] = useState([])
    const { token } = useAuthContext();

    const fetchReviews = async () => {

    }

    const fetchMyReviews = async () => {
        if (!username) {
            console.log("Cannot fetch username, or User is not logged in");
            return;
        }

        try {
            const url = `http://localhost:8000/api/accounts/${username}/reviews`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    //token
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: username,
                }),
            });
            console.log("response: ", response.json())

            const data = await response.json();
            setReviews(data.reviews);
            console.log("data: ", data.reviews)

            if (!response.ok) {
                throw new Error(
                    data.detail ||
                    "An error occurred while fetching reviews."
                );
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    }

    useEffect(() => {
        fetchMyReviews();
    }, [username]);

    if (!username) {
        return <div>Loading username...</div>;
    }

    if (reviews.length === 0) {
        return <div>Loading my reviews...</div>
    }

    return (
        < div >
            <h5>My reviews</h5>
            {reviews.map((review) => (
                <li key={review.id}>{review.text}</li>
            ))}
        </div >
    )
}

export default GetMyReviews
