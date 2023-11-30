import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const GetMyReviews = () => {
    const { username } = useParams();
    const { account } = useAuthContext();
    console.log("account: ", account)
    const [account, setAccount] = useState("")
    const [reviews, setReviews] = useState([])
    const fetchReviews = async () => {
        const url = `http://localhost:8000/api/accounts/${username}/reviews`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("data: ", data)
        setReviews(data.reviews)
    }

    useEffect(() => {
        if (account.username === username) {
            fetchReviews();
        }
    }, [account.username, username])


    if (reviews.length === 0) {
        return <div>Loading my reviews...</div>
    }

    return (
        <div>
            <h5>My reviews</h5>
            <li key={reviews.id}>{reviews.text}</li>
        </div>
    )
}

export default GetMyReviews
