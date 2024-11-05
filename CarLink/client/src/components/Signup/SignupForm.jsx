import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faArrowLeft, faIdCard, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.signupContainer}>
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <form className={styles.signupForm}>
        <h2 className={styles.title}>Đăng Ký</h2>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input type="email" id="email" placeholder="Nhập email" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="idCard" className={styles.label}>
            <FontAwesomeIcon icon={faIdCard} /> Căn cước công dân
          </label>
          <input type="text" id="idCard" placeholder="Nhập số CCCD" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            <FontAwesomeIcon icon={faUser} /> Họ
          </label>
          <input type="text" id="lastName" placeholder="Nhập họ" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            <FontAwesomeIcon icon={faUser} /> Tên
          </label>
          <input type="text" id="firstName" placeholder="Nhập tên" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            <FontAwesomeIcon icon={faPhone} /> Số điện thoại
          </label>
          <input type="tel" id="phone" placeholder="Nhập số điện thoại" className={styles.input} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            <FontAwesomeIcon icon={faLock} /> Mật khẩu
          </label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              className={styles.input}
            />
            {/* <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              onClick={() => setShowPassword(!showPassword)}
            /> */}
          </div>
        </div>

        {/* <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            <FontAwesomeIcon icon={faCheckCircle} /> Xác nhận mật khẩu
          </label>
          <div className={styles.passwordInput}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="••••••••"
              className={styles.input}
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </div> */}

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Địa chỉ
          </label>
          <input type="text" id="address" placeholder="Nhập địa chỉ" className={styles.input} />
        </div>

        <button type="submit" className={styles.signupButton}>Đăng Ký</button>

        <p className={styles.terms}>
          Bằng cách đăng ký hoặc đăng nhập, bạn hiểu và đồng ý với{' '}
          <a href="#">Điều khoản sử dụng chung</a> và <a href="#">Chính sách bảo mật</a> của chúng tôi.
        </p>
      </form>
    </div>
  );
};

export default SignupForm;