import React from 'react';
import { Carousel } from 'react-bootstrap';
import altImage from '../imgs/alternative.png';

const ReviewCarousel = ({ restaurantDetails }) => {
    const itemsPerSlide = 3;

    const reviewChunks = restaurantDetails?.reviews
        ? restaurantDetails.reviews.reduce((resultArray, item, index) => {
            const chunkIndex = Math.floor(index / itemsPerSlide);

            if (!resultArray[chunkIndex]) {
                resultArray[chunkIndex] = [];
            }

            resultArray[chunkIndex].push(item);

            return resultArray;
        }, [])
        : [];

    return (
        <Carousel>
            {[...reviewChunks, reviewChunks[0]].map((reviewsChunk, chunkIndex) => (
                <Carousel.Item key={chunkIndex}>
                    <div className="items row">
                        {reviewsChunk.map((review, index) => (
                            <div key={index} className="col-md-4 mb-4">
                                <div className="card" style={{ width: '100%' }}>
                                    <div className="card-body">
                                        <div className="review-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                            <div className="author-image" style={{ flex: '1 0 auto' }}>
                                                <img
                                                    src={review.authorAttribution?.photoUri || altImage}
                                                    onError={(e) => e.target.src = sidebarImage}
                                                    className="rounded-circle"
                                                    alt="Author"
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            </div>
                                            <div className="author-details" style={{ flex: '1 0 auto' }}>
                                                <div className="profile">
                                                    <h4 className="author-name" style={{ fontSize: '16px', margin: '5px 0' }}>
                                                        <a href={review.authorAttribution?.uri} target="_blank" rel="noopener noreferrer">
                                                            {review.authorAttribution?.displayName || 'Unknown Author'}
                                                        </a>
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="star-rating" style={{ flex: '1 0 auto' }}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star} style={{ color: star <= review.rating ? 'gold' : 'gray' }}>
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="date-posted" style={{ flex: '1 0 auto' }}>
                                                <p className="card-subtitle mb-1 text-body-secondary" style={{ textAlign: 'right', margin: 0 }}>
                                                    <small>{new Date(review.publishTime).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</small>
                                                </p>
                                            </div>
                                        </div>
                                        <h4 className="card-title">
                                            <i className="fa-solid fa-quote-left"></i>
                                        </h4>
                                        <div className="template-demo review-text" style={{ fontSize: '12px' }}>
                                            <p style={{ maxHeight: '100px', overflowY: 'auto' }}>
                                                {review.text?.text || 'No review text available'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default ReviewCarousel;
