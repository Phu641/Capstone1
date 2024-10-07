import React, { useState } from "react";
import "./Header.css"; // Import file CSS
import { FaBars, FaUserCircle, FaCarAlt, FaQuestionCircle, FaGift, FaPhone, FaGavel, FaShieldAlt, FaTools, FaCalculator } from "react-icons/fa"; // Import icon từ react-icons

const Header = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo1.jpg" alt="LOGO"/>
      </div>

      <div className="actions">
        <button className="become-host nav-button">Become partner</button>

        <div className="menu-icon" onClick={toggleNav}>
          <FaBars className="hamburger-icon" />
          <FaUserCircle className="avatar-icon" />
        </div>

        {isNavVisible && (
          <nav className="navigation">
            <ul>
              <li><a href="/login">Log in</a></li>
              <li><a href="/signup">Sign up</a></li>
              <li><a href="/become-host"><FaCarAlt /> Become partner</a></li>
              <hr />
              <li><a href="/how-it-works"><FaQuestionCircle /> How CarLink works</a></li>
              <li><a href="/gift-cards"><FaGift /> Gift cards</a></li>
              <li><a href="/contact-support"><FaPhone /> Contact support</a></li>
              <li><a href="/legal"><FaGavel /> Legal</a></li>
              <li><a href="/insurance"><FaShieldAlt /> Insurance & protection</a></li>
              <li><a href="/host-tools"><FaTools /> Host tools</a></li>
              <li><a href="/calculator"><FaCalculator /> Calculator</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
