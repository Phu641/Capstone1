import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.warning('Vui lòng nhập đầy đủ thông tin', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }

    try {
      const loginResponse = await axios.post('http://localhost:3000/customer/login', {
        email: username,
        password
      });

      if (loginResponse.data.signature) {
        localStorage.setItem('token', loginResponse.data.signature);

        const roleResponse = await axios.get('http://localhost:3000/customer/check-role', {
          headers: {
            'Authorization': `Bearer ${loginResponse.data.signature}`
          }
        });

        if (roleResponse.data.role === 'user') {
          navigate('/');
        } else if (roleResponse.data.role === 'admin' || roleResponse.data.role === 'owner') {
          navigate('/');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Tên đăng nhập hoặc mật khẩu không đúng', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
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
          <label htmlFor="username">
            <FontAwesomeIcon icon={faUser} /> Tên đăng nhập
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nhập email"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">
            <FontAwesomeIcon icon={faLock} /> Mật khẩu
          </label>
          <div className={styles.passwordInput}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
