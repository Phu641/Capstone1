import React from 'react';
import './ForgotPasswordForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  return (
    <div className="forgot-password-container">
      <button className="back-button" onClick={() => navigate('/login')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <form className="forgot-password-form">
        <h2>Quên Mật Khẩu</h2>
        
        <div className="form-group">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input type="email" id="email" placeholder="Nhập email của bạn" />
        </div>

        <button type="submit" className="reset-password-button">Đặt Lại Mật Khẩu</button>

        <p className="back-to-login">
          <Link to="/login">Quay Lại Đăng Nhập</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
