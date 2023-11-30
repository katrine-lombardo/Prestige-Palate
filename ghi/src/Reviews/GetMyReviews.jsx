import React, { useEffect, useState } from "react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const GetMyReviews = () => {
    const { token } = useAuthContext();
    const [username, setUsername] = useState("");
    const [reviews, setReviews] = useState([])
    console.log("reviews: ", reviews)
    console.log("token: ", token)

    const fetchReviews = async () => {
        if (!username) {
            console.log("User is not logged in");
            return;
        }
        const url = `http://localhost:8000/api/accounts/${username}/reviews`;
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    //token
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username: username,
                    first_name: firstName,
                    last_name: lastName,
                }),
            });

            const data = await response.json();
            setReviews(data.reviews);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    useEffect(() => {
        fetchReviews();
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
