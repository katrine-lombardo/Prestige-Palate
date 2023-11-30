import React, { useEffect, useState } from "react";

const AppReviewList = () => {
    const [reviews, setReviews] = useState([]);

    const fetchRestaurants = async () => {
        const url = `http://localhost:8000/api/restaurants/${place_id}/reviews`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setReviews(data.reviews)
        }
    }
}

export default AppReviewList
