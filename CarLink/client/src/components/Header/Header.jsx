import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./Header.module.css";
import {
  FaBars,
  FaUserCircle,
  FaCarAlt,
  FaQuestionCircle,
  FaGift,
  FaPhone,
  FaGavel,
  FaShieldAlt,
  FaTools,
  FaCalculator,
} from "react-icons/fa"; // Import icon từ react-icons

const Header = () => {
  const navLinks = [
    { path: "/home", display: "Home" },
    { path: "/about", display: "About" },
    { path: "/cars", display: "Cars" },
    { path: "/blogs", display: "Blog" },
    { path: "/contact", display: "Contact" },
  ];

  const [isNavVisible, setIsNavVisible] = useState(false);
  const navigate = useNavigate();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleBecomePartner = () => {
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <a className={styles.logoContainer}>
        <img src="/logo.jpg" alt="Logo" className={styles.logoContainerImg} />
      </a>

      {/* Main navigation links */}
      <nav className={styles.mainNav}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              <a href={link.path}>{link.display}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.logo}>{/* <img src="/logo.jpg" alt="LOGO"/> */}</div>

      <div className={styles.actions}>
        <button
          className={`${styles.becomeHost} ${styles.navButton}`}
          onClick={handleBecomePartner}
        >
          Become partner
        </button>

        <div className={styles.menuIcon} onClick={toggleNav}>
          <FaBars className={styles.hamburgerIcon} />
        </div>
        <div className={styles.userIcon} onClick={() => navigate("/login")}>
          <FaUserCircle className={styles.avatarIcon} />
        </div>

        {isNavVisible && (
          <nav className={styles.navigation}>
            <ul>
              <li>
                <a href="/login">Log in</a>
              </li>
              <li>
                <a href="/signup">Sign up</a>
              </li>
              <li>
                <a href="/become-host">
                  <FaCarAlt />
                  Become partner
                </a>
              </li>
              <li>
                <a href="/add-car">
                  <FaCarAlt />
                  Add Car
                </a>
              </li>
              <hr />
              <li>
                <a href="/how-it-works">
                  <FaQuestionCircle />
                  How CarLink works
                </a>
              </li>
              <li>
                <Link href="/gift-cards">
                  <FaGift /> Gift cards
                </Link>
              </li>
              <li>
                <a href="/contact-support">
                  <FaPhone /> Contact support
                </a>
              </li>
              <li>
                <a href="/legal">
                  <FaGavel /> Legal
                </a>
              </li>
              <li>
                <a href="/insurance">
                  <FaShieldAlt /> Insurance & protection
                </a>
              </li>
              <li>
                <a href="/host-tools">
                  <FaTools /> Host tools
                </a>
              </li>
              <li>
                <a href="/calculator">
                  <FaCalculator /> Calculator
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
