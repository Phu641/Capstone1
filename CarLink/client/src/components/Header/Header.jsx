import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
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
  FaHeart
} from "react-icons/fa";

const NAV_LINKS = [
  { path: "/home", display: "Trang chủ" },
  { path: "/about", display: "Giới thiệu" },
  { path: "/cars", display: "Thuê xe" },
  { path: "/blogs", display: "Blog" },
  { path: "/contact", display: "Liên hệ" },
];

const MENU_ITEMS = [
  { path: "/add-car", icon: FaCarAlt, text: "Đăng xe cho thuê" },
  { path: "/favorites", icon: FaHeart, text: "Danh sách xe yêu thích của bạn" },
  { path: "/how-it-works", icon: FaQuestionCircle, text: "CarLink hoạt động như thế nào?" },
  { path: "/gift-cards", icon: FaGift, text: "Voucher" },
  { path: "/contact-support", icon: FaPhone, text: "Liên hệ hỗ trợ" },
  { path: "/legal", icon: FaGavel, text: "Chính sách" },
  { path: "/insurance", icon: FaShieldAlt, text: "Bảo hiểm và bảo dưỡng" },
  { path: "/host-tools", icon: FaTools, text: "Công cụ" },
  { path: "/calculator", icon: FaCalculator, text: "Máy tính" },
];

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navRef = useRef(null);
  const menuIconRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserProfile = async (token) => {
    try {
      const response = await fetch('http://localhost:3000/customer/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setUserInfo(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching user info:', error);
      handleLogout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isNavVisible &&
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !menuIconRef.current.contains(event.target)
      ) {
        setIsNavVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isNavVisible]);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');

      setTimeout(() => {
        setUserInfo(null);
        setIsNavVisible(false);
        navigate('/login');
      }, 100);
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
  };

  const renderMenuItems = () => (
    <ul>
      {!userInfo && (
        <>
          <li><Link to="/login">Đăng nhập</Link></li>
          <li><Link to="/signup">Đăng ký</Link></li>
          <li>
            <Link to="/login">
              <FaCarAlt />Trở thành đối tác
            </Link>
          </li>
        </>
      )}
      {MENU_ITEMS.map(({ path, icon: Icon, text }) => (
        <li key={path}>
          <Link to={path}>
            <Icon />{text}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logoContainer}>
        <img src="/logo.jpg" alt="Logo" className={styles.logoContainerImg} />
      </Link>

      <nav className={styles.mainNav}>
        <ul>
          {NAV_LINKS.map(({ path, display }) => (
            <li key={path}>
              <Link to={path}>{display}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        {!userInfo && (
          <button className={styles.becomeHost} onClick={() => navigate("/login")}>
            Trở thành đối tác
          </button>
        )}

        <div className={styles.menuIcon} onClick={() => setIsNavVisible(!isNavVisible)} ref={menuIconRef}>
          <FaBars className={styles.hamburgerIcon} />
        </div>

        {userInfo ? (
          <>
            <div className={styles.userSection}>
              <span className={styles.userName}>{userInfo.firstName}</span>
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        ) : (
          <div className={styles.userSection} onClick={() => navigate("/login")}>
            <FaUserCircle className={styles.avatarIcon} />
          </div>
        )}

        {isNavVisible && (
          <nav className={styles.navigation} ref={navRef}>
            {renderMenuItems()}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
