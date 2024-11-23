import React, { useState } from 'react';
import axios from 'axios';
import styles from './SignupForm.module.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faArrowLeft, faIdCard, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const INITIAL_FORM_STATE = {
  email: '',
  idCard: '',
  firstName: '',
  lastName: '',
  phone: '',
  password: '',
  address: ''
};

const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Email không hợp lệ'
  },
  phone: {
    pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
    message: 'Số điện thoại không hợp lệ'
  },
  idCard: {
    pattern: /^\d{12}$/,
    message: 'Số CCCD không hợp lệ'
  },
  password: {
    minLength: 6,
    message: 'Mật khẩu phải có ít nhất 6 ký tự'
  }
};

const FORM_FIELDS = [
  { id: 'email', label: 'Email', type: 'email', icon: faEnvelope, placeholder: 'Nhập email' },
  { id: 'idCard', label: 'Căn cước công dân', type: 'text', icon: faIdCard, placeholder: 'Nhập số CCCD' },
  { id: 'lastName', label: 'Họ', type: 'text', icon: faUser, placeholder: 'Nhập họ' },
  { id: 'firstName', label: 'Tên', type: 'text', icon: faUser, placeholder: 'Nhập tên' },
  { id: 'phone', label: 'Số điện thoại', type: 'tel', icon: faPhone, placeholder: 'Nhập số điện thoại' },
  { id: 'password', label: 'Mật khẩu', type: 'password', icon: faLock, placeholder: '••••••••' },
  { id: 'address', label: 'Địa chỉ', type: 'text', icon: faMapMarkerAlt, placeholder: 'Nhập địa chỉ' }
];

const TOAST_CONFIG = {
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
};

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [showPassword, setShowPassword] = useState(false);

  const validateField = (field, value) => {
    const rule = VALIDATION_RULES[field];
    if (!rule) return true;

    if (rule.pattern && !rule.pattern.test(value)) {
      toast.error(rule.message, TOAST_CONFIG);
      return false;
    }

    if (rule.minLength && value.length < rule.minLength) {
      toast.error(rule.message, TOAST_CONFIG);
      return false;
    }

    return true;
  };

  const validateForm = () => {
    // Check for empty fields
    const emptyFields = Object.entries(formData).some(([key, value]) => !value);
    if (emptyFields) {
      toast.warning('Vui lòng điền đầy đủ thông tin', TOAST_CONFIG);
      return false;
    }

    // Validate each field
    return Object.entries(formData).every(([field, value]) => validateField(field, value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:3000/customer/signup', formData);
      
      if (response.data.signature) {
        toast.success('🎉 Chúc mừng! Đăng ký thành công', TOAST_CONFIG);
        setTimeout(() => navigate('/login'), 3500);
      }
    } catch (err) {
      toast.warning(err.response?.data?.message || 'Đã có lỗi xảy ra khi đăng ký', TOAST_CONFIG);
    }
  };

  const renderFormField = ({ id, label, type, icon, placeholder }) => (
    <div key={id} className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        <FontAwesomeIcon icon={icon} /> {label}
      </label>
      <div className={id === 'password' ? styles.passwordInput : ''}>
        <input
          type={id === 'password' ? (showPassword ? "text" : "password") : type}
          id={id}
          placeholder={placeholder}
          className={styles.input}
          value={formData[id]}
          onChange={(e) => setFormData(prev => ({ ...prev, [id]: e.target.value }))}
        />
      </div>
    </div>
  );

  return (
    <div className={styles.signupContainer}>
      <ToastContainer />
      <button className={styles.backButton} onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Đăng ký</h2>
        
        {FORM_FIELDS.map(renderFormField)}
        
        <button type="submit" className={styles.signupButton}>Đăng ký</button>
        
        <p className={styles.terms}>
          Bằng cách đăng ký hoặc đăng nhập, bạn hiểu và đồng ý với{' '}
          <a href="#">Điều khoản sử dụng chung</a> và <a href="#">Chính sách bảo mật</a> của chúng tôi.
        </p>
      </form>
    </div>
  );
};

export default SignupForm;