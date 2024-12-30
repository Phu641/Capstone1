import React, { useState } from "react";
import styles from "./ResetPasswordForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faKey,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Kiểm tra thông tin nhập
    if (!email || !otp || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Chuyển đổi OTP sang số
    const numericOtp = parseInt(otp, 10);

    if (isNaN(numericOtp)) {
      toast.error("Mã OTP phải là số hợp lệ!");
      return;
    }

    console.log("Sending data to API:", {
      email,
      otp: numericOtp,
      newPassword: password,
    });

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/customer/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp: numericOtp,
            newPassword: password,
          }),
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      if (response.ok) {
        toast.success(
          `${data.message}. Bạn sẽ được chuyển đến trang đăng nhập sau 3 giây.`
        );

        // Chờ 3 giây và điều hướng tới /login
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.resetPasswordContainer}>
      {isLoading && (
        <div className={styles.overlay}>
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}

      <form
        className={
          isLoading ? styles.resetPasswordFormBlur : styles.resetPasswordForm
        }
        onSubmit={handleResetPassword}
      >
        <h2 className={styles.title}>Đặt lại mật khẩu</h2>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            <FontAwesomeIcon icon={faEnvelope} /> Email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="otp">
            Mã OTP
          </label>
          <input
            className={styles.input}
            type="text"
            id="otp"
            placeholder="Nhập mã OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">
            <FontAwesomeIcon icon={faKey} /> Mật Khẩu Mới
          </label>
          <div className={styles.passwordContainer}>
            <input
              className={styles.input}
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.passwordToggle}
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className={styles.resetPasswordButton}
          disabled={isLoading}
        >
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
