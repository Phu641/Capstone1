import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const carTypes = [
  { path: "/classic-car-rental", label: "Xe cổ điển" },
  { path: "/convertible-car-rental", label: "Xe mui trần" },
  { path: "/electric-vehicle-rental", label: "Xe điện" },
  { path: "/luxury-car-rental", label: "Xe sang trọng" },
  { path: "/minivan-rental", label: "Xe minivan" },
  { path: "/sports-car-rental", label: "Xe thể thao" },
  { path: "/suv-rental", label: "Xe SUV" },
  { path: "/truck-rental", label: "Xe tải" },
  { path: "/van-rental", label: "Xe Van" },
];

const carBrands = [
  { path: "/honda-rental", label: "Honda" },
  { path: "/toyota-rental", label: "Toyota" },
  { path: "/hyundai-rental", label: "Hyundai" },
  { path: "/mitsubishi-rental", label: "Mitsubishi" },
  { path: "/ford-rental", label: "Ford" },
  { path: "/ferrari-rental", label: "Ferrari" },
  { path: "/lamborghini-rental", label: "Lamborghini" },
  { path: "/rolls-royce-rental", label: "Rolls-Royce" },
  { path: "/aston-martin-rental", label: "Aston Martin" },
  { path: "/nissan-rental", label: "Nissan" },
];

const exploreLinks = [
  { path: "/book-a-car", label: "Thuê xe" },
  { path: "/trust", label: "Sự tin cậy và an toàn" },
  { path: "/get-help", label: "Hỗ trợ" },
];

const socialIcons = [
  { Icon: FaFacebookF, className: "facebookIcon" },
  { Icon: FaTwitter, className: "twitterIcon" },
  { Icon: FaInstagram, className: "instagramIcon" },
  { Icon: FaYoutube, className: "youtubeIcon" },
];

const FooterSection = ({ title, links }) => (
  <div className={styles.footerSection}>
    <h3>{title}</h3>
    <ul className={styles.footerList}>
      {links.map(({ path, label }) => (
        <li key={path}>
          <Link to={path}>{label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <FooterSection title="Các loại xe" links={carTypes} />
          <FooterSection title="Thương hiệu" links={carBrands} />
        </div>
        
        <div className={styles.footerMain}>
          <FooterSection title="Khám phá" links={exploreLinks} />
          <div className={`${styles.footerColumn} ${styles.social}`}>
            <div className={styles.socialIcons}>
              {socialIcons.map(({ Icon, className }) => (
                <div key={className} className={styles[className]}>
                  <Icon />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <ul>
            <li><Link to="/terms">Điều khoản</Link></li>
            <li><Link to="/privacy">Quyền riêng tư</Link></li>
            <li><Link to="/cookie-preferences">Tùy chọn Cookie</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

FooterSection.propTypes = {
  title: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Footer;
