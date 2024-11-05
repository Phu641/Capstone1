import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.loginContainer}>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <form className={styles.loginForm}>
        <h2>Đăng nhập</h2>

        <div className={styles.formGroup}>
          <label htmlFor="username">
            <FontAwesomeIcon icon={faUser} /> Tên đăng nhập
          </label>
          <input type="text" id="username" placeholder="Nhập tên đăng nhập" />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Mật khẩu
          </label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
            />
            {/* <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            /> */}
          </div>
        </div>

        <button type="submit" className={styles.loginButton}>Đăng nhập</button>

        <div className={styles.additionalLinks}>
          <p className={styles.forgotPassword}>
            <Link to="/forgot-password">Quên mật khẩu?</Link>
          </p>
        </div>

        <div className={styles.signupLinks}>
          <p className={styles.signupAccount}>
            <Link to="/signup" onClick={() => navigate('/signup')}>Chưa có tài khoản? Đăng ký</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
