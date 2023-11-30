import React, { useEffect, useState } from "react";

const MyReviews = () => {
    const [reviews, setReviews] = useState([])
    const fetchReviews = async () => {
        const url = `/api/accounts/{username}/reviews`
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json();
            setReviews(data.reviews)
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [])


    if (!reviews) {
        return <div>Loading my reviews...</div>
    }

    async function loadReviews() {
        const request = await fetch(`http://localhost:8000/api/accounts/{username}/reviews`);
        const resp = await request.json();
        setReviews(resp.reviews)
    }

    useEffect(() => {
        loadReviews();
    }, []);

    return (
        <div>
            <h5>My reviews</h5>
            <li></li>
        </div>
    )
}

export default MyReviews
