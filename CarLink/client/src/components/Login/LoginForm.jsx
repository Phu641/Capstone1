import React, { useState } from 'react';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <button className="back-button" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <form className="login-form">
        <h2>Đăng nhập</h2>

        <div className="form-group">
          <label htmlFor="username">
            <FontAwesomeIcon icon={faUser} /> Tên đăng nhập
          </label>
          <input type="text" id="username" placeholder="Nhập tên đăng nhập" />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Mật khẩu
          </label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
            />
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        <button type="submit" className="login-button">Đăng nhập</button>

        <div className="additional-links">
          <p className="forgot-password">
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </p>
        </div>

        <div className="signup-links">
          <p className="signup-account">
            <Link to="/signup" onClick={() => navigate('/signup')}>Chưa có tài khoản? Đăng ký</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
