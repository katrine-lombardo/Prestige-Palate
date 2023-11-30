import React, { useEffect, useState } from "react";

const AppReviewList = () => {
    const [reviews, setReviews] = useState([]);

    const fetchData = async () => {
        const url = `http://localhost:8000/api/accounts/${username}/reviews`;
    }
}

export default AppReviewList
