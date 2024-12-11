import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import styles from "./Footer.module.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const carTypes = [
  { path: "/cars", label: "Xe cổ điển" },
  { path: "/cars", label: "Xe mui trần" },
  { path: "/cars", label: "Xe điện" },
  { path: "/cars", label: "Xe sang trọng" },
  { path: "/cars", label: "Xe minivan" },
  { path: "/cars", label: "Xe thể thao" },
  { path: "/cars", label: "Xe SUV" },
  { path: "/cars", label: "Xe tải" },
  { path: "/cars", label: "Xe Van" },
];

const carBrands = [
  { path: "/cars", label: "Honda" },
  { path: "/cars", label: "Toyota" },
  { path: "/cars", label: "Hyundai" },
  { path: "/cars", label: "Mitsubishi" },
  { path: "/cars", label: "Ford" },
  { path: "/cars", label: "Vinfast" },
  { path: "/cars", label: "Kia" },
  { path: "/cars", label: "BMW" },
  { path: "/cars", label: "Mercedes-Benz" },
  { path: "/cars", label: "Mazda" },
];

const exploreLinks = [
  { path: "/cars", label: "Thuê xe" },
  { path: "/contact", label: "Hỗ trợ" }
];

const socialIcons = [
  { Icon: FaFacebookF, className: "facebookIcon" },
  { Icon: FaTwitter, className: "twitterIcon" },
  { Icon: FaInstagram, className: "instagramIcon" },
  { Icon: FaYoutube, className: "youtubeIcon" },
];

const FooterSection = ({ title, links, className }) => (
  <div className={`${styles.footerSection} ${className || ''}`}>
    <h3>{title}</h3>
    <ul className={`${styles.footerList} ${className || ''}`}>
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
          <FooterSection title="Khám phá" links={exploreLinks} className={styles.exploreSection} />
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
            <li><Link to="/privacy">Chính sách và quy định</Link></li>
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
  className: PropTypes.string,
};

export default Footer;
