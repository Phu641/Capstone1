import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerSection}>
            <h3>Vehicle types</h3>
            <ul className={styles.footerList}>
              <li>
                <Link to="/car-rental">Car rental</Link>
              </li>
              <li>
                <Link to="/classic-car-rental">Classic car rental</Link>
              </li>
              <li>
                <Link to="/convertible-car-rental">Convertible car rental</Link>
              </li>
              <li>
                <Link to="/electric-vehicle-rental">
                  Electric vehicle rental
                </Link>
              </li>
              <li>
                <Link to="/luxury-car-rental">Exotic & luxury car rental</Link>
              </li>
              <li>
                <Link to="/minivan-rental">Minivan rental</Link>
              </li>
              <li>
                <Link to="/sports-car-rental">Sports car rental</Link>
              </li>
              <li>
                <Link to="/suv-rental">SUV rental</Link>
              </li>
              <li>
                <Link to="/truck-rental">Truck rental</Link>
              </li>
              <li>
                <Link to="/van-rental">Van rental</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Makes</h3>
            <ul className={styles.footerList}>
              <li>
                <Link to="/audi-rental">Audi rental</Link>
              </li>
              <li>
                <Link to="/bmw-rental">BMW rental</Link>
              </li>
              <li>
                <Link to="/dodge-rental">Dodge rental</Link>
              </li>
              <li>
                <Link to="/ferrari-rental">Ferrari rental</Link>
              </li>
              <li>
                <Link to="/jeep-rental">Jeep rental</Link>
              </li>
              <li>
                <Link to="/lamborghini-rental">Lamborghini rental</Link>
              </li>
              <li>
                <Link to="/nissan-rental">Nissan rental</Link>
              </li>
              <li>
                <Link to="/rolls-royce-rental">Rolls-Royce rental</Link>
              </li>
              <li>
                <Link to="/tesla-rental">Tesla rental</Link>
              </li>
              <li>
                <Link to="/toyota-rental">Toyota rental</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerMain}>
          <div className={styles.footerColumn}>
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/book-a-car">Book a car</Link>
              </li>
              <li>
                <Link to="/trust">Trust & safety</Link>
              </li>
              <li>
                <Link to="/get-help">Get help</Link>
              </li>
            </ul>
          </div>
          <div className={`${styles.footerColumn} ${styles.social}`}>
            <div className={styles.socialIcons}>
              <div className={styles.facebookIcon}>
                <FaFacebookF />
              </div>
              <div className={styles.twitterIcon}>
                <FaTwitter />
              </div>
              <div className={styles.instagramIcon}>
                <FaInstagram />
              </div>
              <div className={styles.youtubeIcon}>
                <FaYoutube />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <ul>
            <li>
              <Link to="/terms">Terms</Link>
            </li>
            <li>
              <Link to="/privacy">Privacy</Link>
            </li>
            <li>
              <Link to="/sitemap">Sitemap</Link>
            </li>
            <li>
              <Link to="/cookie-preferences">Cookie preferences</Link>
            </li>
            <li>
              <Link to="/do-not-sell">
                Do not sell or share my personal information
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
