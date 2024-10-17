import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faEye, faEyeSlash, faCheckCircle, faArrowLeft, faIdCard, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <button className="back-button" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <form className="signup-form">
        <h2>Đăng Ký</h2>

        <div className="form-group">
          <label htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input type="email" id="email" placeholder="Nhập email" />
        </div>

        <div className="form-group">
          <label htmlFor="idCard">
            <FontAwesomeIcon icon={faIdCard} /> Căn cước công dân
          </label>
          <input type="text" id="idCard" placeholder="Nhập số CCCD" />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">
            <FontAwesomeIcon icon={faUser} /> Họ
          </label>
          <input type="text" id="lastName" placeholder="Nhập họ" />
        </div>

        <div className="form-group">
          <label htmlFor="firstName">
            <FontAwesomeIcon icon={faUser} /> Tên
          </label>
          <input type="text" id="firstName" placeholder="Nhập tên" />
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            <FontAwesomeIcon icon={faPhone} /> Số điện thoại
          </label>
          <input type="tel" id="phone" placeholder="Nhập số điện thoại" />
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

        {/* <div className="form-group">
          <label htmlFor="confirmPassword">
            <FontAwesomeIcon icon={faCheckCircle} /> Xác nhận mật khẩu
          </label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="••••••••"
            />
            <FontAwesomeIcon
              icon={showConfirmPassword ? faEyeSlash : faEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </div> */}

        <div className="form-group">
          <label htmlFor="address">
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Địa chỉ
          </label>
          <input type="text" id="address" placeholder="Nhập địa chỉ" />
        </div>

        <button type="submit" className="signup-button">Đăng Ký</button>

        <p className="terms">
          Bằng cách đăng ký hoặc đăng nhập, bạn hiểu và đồng ý với{' '}
          <a href="#">Điều khoản sử dụng chung</a> và <a href="#">Chính sách bảo mật</a> của chúng tôi.
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
