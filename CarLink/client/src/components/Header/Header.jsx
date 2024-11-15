import { useState, useEffect } from "react";
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
} from "react-icons/fa";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('http://localhost:3000/customer/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserInfo(data);
          localStorage.setItem('userInfo', JSON.stringify(data));
        })
        .catch(err => {
          console.error('Error fetching user info:', err);
          localStorage.clear();
          setUserInfo(null);
        });
    } else {
      setUserInfo(null);
    }
  }, [location.pathname]);

  const navLinks = [
    { path: "/home", display: "Trang chủ" },
    { path: "/about", display: "Giới thiệu" },
    { path: "/cars", display: "Thuê xe" },
    { path: "/blogs", display: "Blog" },
    { path: "/contact", display: "Liên hệ" },
  ];

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(null);
    setIsNavVisible(false);
    navigate('/login');
  };

  return (
    <header className={styles.header}>
      <a className={styles.logoContainer}>
        <img src="/logo.jpg" alt="Logo" className={styles.logoContainerImg} />
      </a>

      <nav className={styles.mainNav}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              <a href={link.path}>{link.display}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        {!userInfo && (
          <button className={styles.becomeHost} onClick={handleLogin}>
            Trở thành đối tác
          </button>
        )}

        <div className={styles.menuIcon} onClick={toggleNav}>
          <FaBars className={styles.hamburgerIcon} />
        </div>

        {!userInfo ? (
          <div className={styles.userSection} onClick={handleLogin}>
            <FaUserCircle className={styles.avatarIcon} />
          </div>
        ) : (
          <div className={styles.userSection}>
            <span className={styles.userName}>{userInfo.firstName}</span>
          </div>
        )}

        {userInfo && (
          <button className={styles.logoutButton} onClick={handleLogout}>
            Đăng xuất
          </button>
        )}

        {isNavVisible && (
          <nav className={styles.navigation}>
            <ul>
              {!userInfo && (
                <>
                  <li>
                    <a href="/login">Đăng nhập</a>
                  </li>
                  <li>
                    <a href="/signup">Đăng ký</a>
                  </li>
                  <li>
                    <a href="/login">
                      <FaCarAlt />
                      Trở thành đối tác
                    </a>
                  </li>
                </>
              )}
              <li>
                <a href="/add-car">
                  <FaCarAlt />
                  Đăng xe cho thuê
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
                  <FaGift /> Voucher
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
                  <FaCalculator /> Máy tính
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
