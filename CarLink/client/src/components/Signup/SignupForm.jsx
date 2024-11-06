import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignupForm.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faArrowLeft, faIdCard, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    idCard: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    address: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', formData);
    setError('');

    // Kiểm tra cơ bản
    if (!formData.email || !formData.password || !formData.idCard ||
      !formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      toast.warning('Vui lòng điền đầy đủ thông tin', {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email không hợp lệ', {
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

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error('Số điện thoại không hợp lệ', {
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

    if (!/^\d{12}$/.test(formData.idCard)) {
      toast.error('Số CCCD không hợp lệ', {
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

    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/customer/signup', formData);
      console.log('Success:', response.data);

      if (response.data.signature) {
        localStorage.setItem('token', response.data.signature);
        toast.success('🎉 Chúc mừng! Đăng ký thành công', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            color: 'black',
            fontSize: '16px',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          },
          icon: "🚗"
        });
        setTimeout(() => {
          navigate('/');
        }, 4000);
      }
    } catch (err) {
      toast.warning((err.response?.data?.message || 'Đã có lỗi xảy ra khi đăng ký'), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
          color: 'black',
          fontSize: '16px',
          borderRadius: '10px',
          padding: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }
      });
    }
  };

  return (
    <div className={styles.signupContainer}>
      <ToastContainer />
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Đăng ký</h2>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Nhập email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="idCard" className={styles.label}>
            <FontAwesomeIcon icon={faIdCard} /> Căn cước công dân
          </label>
          <input
            type="text"
            id="idCard"
            placeholder="Nhập số CCCD"
            className={styles.input}
            value={formData.idCard}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            <FontAwesomeIcon icon={faUser} /> Họ
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Nhập họ"
            className={styles.input}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            <FontAwesomeIcon icon={faUser} /> Tên
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Nhập tên"
            className={styles.input}
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            <FontAwesomeIcon icon={faPhone} /> Số điện thoại
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Nhập số điện thoại"
            className={styles.input}
            value={formData.phone}
            onChange={handleChange}
          />
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
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Địa chỉ
          </label>
          <input
            type="text"
            id="address"
            placeholder="Nhập địa chỉ"
            className={styles.input}
            value={formData.address}
            onChange={handleChange}
          />
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