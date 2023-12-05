import React from 'react';

const About = ({ restaurantDetails }) => {
    return (
        <div className="about-section">
            <h3 style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>About</h3>
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
            </div>
        </div>
    );
};

export default About;
