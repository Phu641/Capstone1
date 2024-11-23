import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false
  });
  const navigate = useNavigate();

  const toastConfig = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.warning('Vui lòng nhập đầy đủ thông tin', toastConfig);
      return false;
    }

    if (!validateEmail(email)) {
      toast.error('Email không hợp lệ', toastConfig);
      return false;
    }

    if (password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự', toastConfig);
      return false;
    }

    return true;
  };

  const handleAuthentication = async (token) => {
    try {
      const [profileResponse, roleResponse] = await Promise.all([
        axios.get('http://localhost:3000/customer/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        axios.get('http://localhost:3000/customer/check-role', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      localStorage.setItem('userInfo', JSON.stringify(profileResponse.data));

      const validRoles = ['user', 'admin', 'owner'];
      if (validRoles.includes(roleResponse.data.role)) {
        navigate('/', { replace: true });
      }
    } catch (error) {
      throw new Error('Authentication failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const { email, password } = formData;
      const loginResponse = await axios.post('http://localhost:3000/customer/login', {
        email,
        password
      });

      if (loginResponse.data.signature) {
        localStorage.clear();
        setFormData(prev => ({
          ...prev,
          email: '',
          password: ''
        }));

        const token = loginResponse.data.signature;
        localStorage.setItem('token', token);
        await handleAuthentication(token);
      }
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng';
      toast.error(errorMessage, toastConfig);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <ToastContainer />
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>

        <div className={styles.formGroup}>
          <label htmlFor="email">
            <FontAwesomeIcon icon={faUser} /> Email
          </label>
          <input
            type="text"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Nhập email"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Mật khẩu
          </label>
          <div className={styles.passwordInput}>
            <input
              type={formData.showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="••••••••"
            />
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
            <Link to="/signup">Chưa có tài khoản? Đăng ký</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
