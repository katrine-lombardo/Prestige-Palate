import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <section className="mb-3">
                    <ul className="list-unstyled mb-0 d-flex justify-content-center">
                        <li className="mb-1 me-3" style={{ fontSize: '12px' }}>
                            <Link to="/faq" style={{ color: '#4f4f4f' }}>
                                FAQ
                            </Link>
                        </li>
                        <li style={{ fontSize: '12px' }}>
                            <Link to="/about" style={{ color: '#4f4f4f' }}>
                                About Us
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
            <div className="text-center p-2" style={{ backgroundColor: 'rgb(223, 213, 201)', fontSize: '14px' }}>
                © 2023:
                <Link to="/" className="text-dark">
                    Prestige Palate
                </Link>
            </div>
        </footer>
    );
};

export default Footer;