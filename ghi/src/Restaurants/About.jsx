import React from 'react';

const About = ({ restaurantDetails }) => {
    const {
        regularOpeningHours,
        primaryType,
        websiteUri,
        formattedAddress,
        internationalPhoneNumber,
        priceLevel,
    } = restaurantDetails;

    const smallFontSize = '14px'; 

    return (
        <div className="about-section">
            <div
                className="about-content"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '20px',
                }}
            >
                <div className="hours-of-operation" style={{ fontSize: smallFontSize }}>
                    <h4 style={{ fontSize: smallFontSize }}>Hours of Operation</h4>
                    {regularOpeningHours.weekdayDescriptions.map((day, index) => (
                        <p key={index} style={{ margin: '5px 0' }}>{day}</p>
                    ))}
                </div>
                <div className="other-details" style={{ fontSize: smallFontSize }}>
                    <div className="detail-row">
                        <strong style={{ fontSize: smallFontSize }}>Cuisine:</strong>
                        <span style={{ fontSize: smallFontSize }}>{primaryType}</span>
                    </div>
                    {websiteUri && (
                        <div className="detail-row">
                            <strong style={{ fontSize: smallFontSize }}>Website:</strong>
                            <a
                                href={websiteUri}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: 'none', color: 'blue', fontSize: smallFontSize }}
                            >
                                {websiteUri}
                            </a>
                        </div>
                    )}
                    <div className="detail-row">
                        <strong style={{ fontSize: smallFontSize }}>Address:</strong>
                        <span style={{ fontSize: smallFontSize }}>{formattedAddress}</span>
                    </div>
                    <div className="detail-row">
                        <strong style={{ fontSize: smallFontSize }}>Phone Number:</strong>
                        <span style={{ fontSize: smallFontSize }}>{internationalPhoneNumber}</span>
                    </div>
                    <div className="detail-row">
                        <strong style={{ fontSize: smallFontSize }}>Price Level:</strong>
                        <span style={{ fontSize: smallFontSize }}>
                            {priceLevel.replace('_', ' ').toLowerCase()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;