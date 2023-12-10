import React from 'react';
import './FAQ.css';

const FAQPage = () => {
    return (
        <>
            <div style={{ marginTop: '25px' }}></div>
            <div className="faq-container">
                <h3 className="faq-header">Welcome to the Prestige Palate FAQ Page!</h3>
                <p className="faq-description">If you have any questions about our unique restaurant search website, you've come to the right place. Take a look at the questions below to find the answers you need. If you can't find what you're looking for, feel free to reach out to us.</p>

                <div className="faq-question">
                    <h6>Q: What is Prestige Palate?</h6>
                    <p>A: Prestige Palate is a website that allows users to search for restaurants worldwide based on location. Our platform provides access to both Google reviews and user reviews, along with Google and user photos of the restaurants.</p>
                </div>

                <div className="faq-question">
                    <h6>Q: How can I sign up for Prestige Palate?</h6>
                    <p>A: Signing up for Prestige Palate is by referral only. You must receive an email invitation from an existing user in order to create an account. This exclusive approach helps maintain the quality of our user community.</p>
                </div>

                <div className="faq-question">
                    <h6>Q: Can I still use Prestige Palate if I don't have a referral?</h6>
                    <p>A: Absolutely! Even without a referral, you can still browse the website, search for restaurants, and read reviews. However, you won't be able to write your own reviews or have a personal account until you receive a referral.</p>
                </div>

                <div className="faq-question">
                    <h6>Q: How do referrals work?</h6>
                    <p>A: Referrals are sent through email invitations. If you know someone who is already a Prestige Palate user, ask them to send you a referral. Once you receive the referral email, simply follow the instructions provided to sign up and join our community.</p>
                </div>

                <div className="faq-question">
                    <h6>Q: Can I follow other users on Prestige Palate?</h6>
                    <p>A: Yes, you can! Prestige Palate allows users to follow and unfollow other users. This feature enables you to stay updated on their latest reviews and recommendations.</p>
                </div>

                <div className="faq-question">
                    <h6>Q: How do I create my own reviews on Prestige Palate?</h6>
                    <p>A: Once you have received a referral and signed up for an account, you can start writing your own reviews. Simply search for a restaurant, visit its page, and click on the "Write a Review" button to share your thoughts, experiences, and recommendations.</p>
                </div>

                <div className="faq-question">
                    <h6>Q: What sets Prestige Palate apart from other restaurant search websites?</h6>
                    <p>A: Prestige Palate's uniqueness lies in its referral-only sign-up process. This approach ensures that our user community is composed of individuals who are genuinely interested in contributing quality reviews. By maintaining this exclusivity, we strive to provide accurate and reliable information.</p>
                </div>

                <p className="faq-footer">We hope these answers have provided you with a better understanding of Prestige Palate. If you have any further questions or need assistance, please don't hesitate to contact us. Happy dining and exploring!</p>
            </div>
            <div style={{ marginTop: '25px' }}></div>
        </>
    );
}

export default FAQPage;