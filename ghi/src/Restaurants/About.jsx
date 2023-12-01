import React from 'react';

const About = ({ restaurantDetails }) => {
    return (
        <div className="about-section">
            <h3>About</h3>
            <div className="about-content">
                <div className="hours-of-operation">
                    <h4>Hours of Operation</h4>
                    {restaurantDetails.regularOpeningHours.weekdayDescriptions.map((day, index) => (
                        <p key={index}>{day}</p>
                    ))}
                </div>
                <div className="other-details">
                    <p><strong>Cuisine:</strong> {restaurantDetails.primaryType}</p>
                    {restaurantDetails.websiteUri && (
                        <p><strong>Website:</strong> <a href={restaurantDetails.websiteUri} target="_blank" rel="noopener noreferrer">{restaurantDetails.websiteUri}</a></p>
                    )}
                    <p><strong>Address:</strong> {restaurantDetails.formattedAddress}</p>
                    <p><strong>Phone Number:</strong> {restaurantDetails.internationalPhoneNumber}</p>
                    <p><strong>Price Level:</strong> {restaurantDetails.priceLevel.replace('_', ' ').toLowerCase()}</p>
                </div>
                <div className="other-recommendations">
                    <h4>Other Recommendations</h4>
                    {/* Assuming you have a list of recommended restaurants */}
                    {/* This part could be another component or a list rendered here */}
                </div>
            </div>
        </div>
    );
};

export default About;
