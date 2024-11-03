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
    { path: "/home", display: "Trang chủ" },
    { path: "/about", display: "Chúng tôi" },
    { path: "/cars", display: "Xe" },
    { path: "/blogs", display: "Bài viết" },
    { path: "/contact", display: "Liên hệ" },
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
          Trở thành đối tác
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
                <a href="/login">Đăng nhập</a>
              </li>
              <li>
                <a href="/signup">Đăng kí</a>
              </li>
              <li>
                <a href="/become-host">
                  <FaCarAlt />
                  Trở thành đối tác
                </a>
              </li>
              <li>
                <a href="/add-car">
                  <FaCarAlt />
                  Thêm xe
                </a>
              </li>
              <hr />
              <li>
                <a href="/how-it-works">
                  <FaQuestionCircle />
                  CarLink hoạt động như thế nào?
                </a>
              </li>
              <li>
                <Link href="/gift-cards">
                  <FaGift /> Thẻ quà tặng
                </Link>
              </li>
              <li>
                <a href="/contact-support">
                  <FaPhone /> Liên hệ hỗ trợ
                </a>
              </li>
              <li>
                <a href="/legal">
                  <FaGavel /> Chính sách
                </a>
              </li>
              <li>
                <a href="/insurance">
                  <FaShieldAlt /> Bảo hiểm và bảo dưỡng
                </a>
              </li>
              <li>
                <a href="/host-tools">
                  <FaTools /> Công cụ
                </a>
              </li>
              <li>
                <a href="/calculator">
                  <FaCalculator /> Tính toán
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
