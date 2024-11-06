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
            <h3>Các loại xe</h3>
            <ul className={styles.footerList}>
              <li>
                <Link to="/classic-car-rental">Xe cổ điển</Link>
              </li>
              <li>
                <Link to="/convertible-car-rental">Xe mui trần</Link>
              </li>
              <li>
                <Link to="/electric-vehicle-rental">Xe điện</Link>
              </li>
              <li>
                <Link to="/luxury-car-rental">Xe sang trọng</Link>
              </li>
              <li>
                <Link to="/minivan-rental">Xe minivan</Link>
              </li>
              <li>
                <Link to="/sports-car-rental">Xe thể thao</Link>
              </li>
              <li>
                <Link to="/suv-rental">Xe SUV</Link>
              </li>
              <li>
                <Link to="/truck-rental">Xe tải</Link>
              </li>
              <li>
                <Link to="/van-rental">Xe Van</Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3>Thương hiệu</h3>
            <ul className={styles.footerList}>
              <li>
                <Link to="/audi-rental">Honda</Link>
              </li>
              <li>
                <Link to="/bmw-rental">Toyota</Link>
              </li>
              <li>
                <Link to="/dodge-rental">Huyndai</Link>
              </li>
              <li>
                <Link to="/ferrari-rental">Mitsubishi</Link>
              </li>
              <li>
                <Link to="/jeep-rental">Ford</Link>
              </li>
              <li>
                <Link to="/toyota-rental">Ferrari</Link>
              </li>
              <li>
                <Link to="/lamborghini-rental">Lamborghini</Link>
              </li>
              <li>
                <Link to="/rolls-royce-rental">Rolls-Royce</Link>
              </li>
              <li>
                <Link to="/tesla-rental">Aston Martin</Link>
              </li>
              <li>
                <Link to="/nissan-rental">Nissan</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.footerMain}>
          <div className={styles.footerColumn}>
            <h3>Khám phá</h3>
            <ul>
              <li>
                <Link to="/book-a-car">Thuê xe</Link>
              </li>
              <li>
                <Link to="/trust">Sự tin cậy và an toàn</Link>
              </li>
              <li>
                <Link to="/get-help">Hỗ trợ</Link>
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
              <Link to="/terms">Điều khoản</Link>
            </li>
            <li>
              <Link to="/privacy">Quyền riêng tư</Link>
            </li>
            <li>
              <Link to="/cookie-preferences">Tùy chọn Cookie</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
