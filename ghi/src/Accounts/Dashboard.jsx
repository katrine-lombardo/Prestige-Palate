import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '@galvanize-inc/jwtdown-for-react';
import Loading from '../Loading';

const tokenUrl = import.meta.env.VITE_APP_API_HOST;
if (!tokenUrl) {
    throw new Error('VITE_APP_API_HOST was undefined.');
}

const Dashboard = () => {
    const { token } = useAuthContext();
    const [username, setAccountUsername] = useState('');
    const [icon_id, setIconId] = useState('');
    const [icon_url, setIconUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [following, setFollowing] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewsWithTitle, setReviewsWithTitle] = useState([]);
    const [sortKey, setSortKey] = useState('latest');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {
        document.title = `Dashboard  ·  Prestige Palate`;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const accountUrl = `${tokenUrl}/token`;
                const accountResponse = await fetch(accountUrl, { credentials: 'include' });
                const accountData = await accountResponse.json();

                if (accountData && token) {
                    setAccountUsername(accountData.account.username);
                    const iconUrl = `${tokenUrl}/api/accounts/${accountData.account.id}`;
                    const iconResponse = await fetch(iconUrl, { credentials: 'include' });
                    const iconData = await iconResponse.json();

                    const iconsUrl = `${tokenUrl}/api/icons`;
                    const iconsResponse = await fetch(iconsUrl, { credentials: 'include' });
                    const iconsData = await iconsResponse.json();

                    setIconId(iconData.profile_icon_id);
                    setIconUrl(iconsData[iconData.profile_icon_id - 1]?.icon_url);
                    setLoading(false);
                }

                if (accountData.account.username) {
                    const followingUrl = `${tokenUrl}/api/accounts/following/${accountData.account.username}`;
                    const followingResponse = await fetch(followingUrl, { credentials: 'include' });
                    const followingData = await followingResponse.json();
                    setFollowing(followingData);

                    if (followingData) {
                        const allReviews = [];
                        for (const followedUser of followingData) {
                            const reviewsUrl = `${tokenUrl}/api/accounts/${followedUser}/reviews`;
                            const reviewsResponse = await fetch(reviewsUrl, { credentials: 'include' });
                            const reviewsData = await reviewsResponse.json();
                            allReviews.push(reviewsData);
                        }
                        const flattenedReviews = allReviews.flat();
                        const sortedReviews = [...flattenedReviews].sort(
                            (a, b) => new Date(b.publish_time) - new Date(a.publish_time)
                        );

                        setReviews((prevReviews) => [...prevReviews, ...sortedReviews]);

                        if (sortedReviews.length > 0) {
                            const reviewsWithRestaurantNames = await Promise.all(
                                sortedReviews.map(async (review) => {
                                    const restaurantUrl = `${tokenUrl}/api/restaurants/${review.place_id}`;
                                    const restaurantResponse = await fetch(restaurantUrl);
                                    const restaurantData = await restaurantResponse.json();
                                    return {
                                        ...review,
                                        restaurantName: restaurantData.displayName.text,
                                    };
                                })
                            );
                            setReviews(reviewsWithRestaurantNames);
                        }
                    } else {
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [token, sortKey]);

    const sortedReviews = () => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        const sorted = [...reviews].sort((a, b) => {
            switch (sortKey) {
                case 'latest':
                    return new Date(b.publish_time) - new Date(a.publish_time);
                case 'highestRating':
                    return b.rating - a.rating;
                case 'lowestRating':
                    return a.rating - b.rating;
                default:
                    return 0;
            }
        });

        return sorted.slice(indexOfFirstItem, indexOfLastItem);
    };

    const totalPages = Math.ceil(reviews.length / itemsPerPage);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const handleSortChange = (e) => {
        setSortKey(e.target.value);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div className="text-center">
                <h5 className="card-header">REVIEWS FROM ACCOUNTS I FOLLOW</h5>

                {loading ? (
                    <Loading />
                ) : reviews.length > 0 ? (
                    <>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label>Reviews per page: </label>
                                <select
                                    className="form-control d-inline-block w-auto ml-2"
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label>Sort by: </label>
                                <select
                                    className="form-control d-inline-block w-auto ml-2"
                                    onChange={handleSortChange}
                                    value={sortKey}
                                >
                                    <option value="latest">Latest</option>
                                    <option value="highestRating">Highest Rating</option>
                                    <option value="lowestRating">Lowest Rating</option>
                                </select>
                            </div>
                        </div>

                        {sortedReviews().map((review) => (
                            <div key={review.id} className="card border-0 mb-3 mx-auto" style={{ maxWidth: '600px' }}>
                                <div className="card-body">
                                    <div className="row align-items-start">
                                        <div className="col-3">
                                            <img src={review.profile_icon_url} alt="User" className="user-icon" />
                                            <div>
                                                <Link to={`/accounts/${review.username}`}>
                                                    {review.username}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="col-9">
                                            <div className="d-flex justify-content-between">
                                                <div className="card-title">
                                                    <blockquote className="blockquote">
                                                        <div>
                                                            <Link
                                                                to={`/restaurants/${review.place_id}`}
                                                            >
                                                                <h5 className="card-title">
                                                                    {review.restaurantName}
                                                                </h5>
                                                            </Link>
                                                        </div>
                                                        <p>{review.title}</p>
                                                    </blockquote>
                                                </div>
                                                <div>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span
                                                            key={star}
                                                            style={{
                                                                color: star <= review.rating ? 'gold' : 'gray',
                                                                fontSize: '2em',
                                                            }}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <small>
                                                    {new Date(review.publish_time).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </small>
                                            </div>
                                            <div className="card-text text-start">
                                                <p>{review.text}</p>
                                                <div className="review-photos">
                                                    {Array.isArray(review.photo_urls) &&
                                                        review.photo_urls.length > 0 ? (
                                                        review.photo_urls.map((url, photoIndex) => (
                                                            <img
                                                                key={photoIndex}
                                                                src={url}
                                                                alt={`Photo by ${username}`}
                                                                style={{
                                                                    maxWidth: '20%',
                                                                    height: 'auto',
                                                                }}
                                                            />
                                                        ))
                                                    ) : (
                                                        <p>
                                                            <small>
                                                                <em>No photos attached to this review</em>
                                                            </small>
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <nav>
                            <ul className="pagination justify-content-center">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <li
                                        key={page}
                                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => changePage(page)}
                                        >
                                            {page}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </>
                ) : (
                    <p>No reviews from accounts you follow.</p>
                )}
            </div>
        </>
    );
};

export default Dashboard;
