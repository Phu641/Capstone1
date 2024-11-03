import React from 'react';
import styles from './ForgotPasswordForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.forgotPasswordContainer}>
      <button className={styles.backButton} onClick={() => navigate('/login')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <form className={styles.forgotPasswordForm}>
        <h2 className={styles.title}>Quên Mật Khẩu</h2>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input className={styles.input} type="email" id="email" placeholder="Nhập email của bạn" />
        </div>

        <button type="submit" className={styles.resetPasswordButton}>Đặt Lại Mật Khẩu</button>

        <div className={styles.backToLogin}>
          <Link className={styles.backToLoginLink} to="/login">Quay Lại Đăng Nhập</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
