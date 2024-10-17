import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiAppstore, SiGoogleplay } from 'react-icons/si';
import { IoLanguage } from 'react-icons/io5';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-section">
                        <h3>Vehicle types</h3>
                        <ul className="footer-list">
                            <li><Link to="/car-rental">Car rental</Link></li>
                            <li><Link to="/classic-car-rental">Classic car rental</Link></li>
                            <li><Link to="/convertible-car-rental">Convertible car rental</Link></li>
                            <li><Link to="/electric-vehicle-rental">Electric vehicle rental</Link></li>
                            <li><Link to="/luxury-car-rental">Exotic & luxury car rental</Link></li>
                            <li><Link to="/minivan-rental">Minivan rental</Link></li>
                            <li><Link to="/sports-car-rental">Sports car rental</Link></li>
                            <li><Link to="/suv-rental">SUV rental</Link></li>
                            <li><Link to="/truck-rental">Truck rental</Link></li>
                            <li><Link to="/van-rental">Van rental</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h3>Makes</h3>
                        <ul className="footer-list">
                            <li><Link to="/audi-rental">Audi rental</Link></li>
                            <li><Link to="/bmw-rental">BMW rental</Link></li>
                            <li><Link to="/dodge-rental">Dodge rental</Link></li>
                            <li><Link to="/ferrari-rental">Ferrari rental</Link></li>
                            <li><Link to="/jeep-rental">Jeep rental</Link></li>
                            <li><Link to="/lamborghini-rental">Lamborghini rental</Link></li>
                            <li><Link to="/nissan-rental">Nissan rental</Link></li>
                            <li><Link to="/rolls-royce-rental">Rolls-Royce rental</Link></li>
                            <li><Link to="/tesla-rental">Tesla rental</Link></li>
                            <li><Link to="/toyota-rental">Toyota rental</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-main">
                    <div className="footer-column">
                        <h3>Explore</h3>
                        <ul>
                            <li><Link to="/book-a-car">Book a car</Link></li>
                            <li><Link to="/trust">Trust & safety</Link></li>
                            <li><Link to="/get-help">Get help</Link></li>
                        </ul>
                    </div>
                    <div className="footer-column social">
                        <div className="social-icons">
                            <div className="facebook-icon">
                                <FaFacebookF />
                            </div>
                            <div className="twitter-icon">
                                <FaTwitter />
                            </div>
                            <div className="instagram-icon">
                                <FaInstagram />
                            </div>
                            <div className="youtube-icon">
                                <FaYoutube />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <ul>
                        <li><Link to="/terms">Terms</Link></li>
                        <li><Link to="/privacy">Privacy</Link></li>
                        <li><Link to="/sitemap">Sitemap</Link></li>
                        <li><Link to="/cookie-preferences">Cookie preferences</Link></li>
                        <li><Link to="/do-not-sell">Do not sell or share my personal information</Link></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
