import React, { useState } from "react";
import styles from "./ForgotPasswordForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Vui lòng nhập email!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/customer/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        // Điều hướng đến trang /reset-password
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng!"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.forgotPasswordContainer}>
      {isLoading && (
        <div className={styles.overlay}>
          <ReactLoading type="spin" color="#fff" height={50} width={50} />
        </div>
      )}
      <button className={styles.backButton} onClick={() => navigate("/login")}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>

      <form
        className={
          isLoading ? styles.forgotPasswordFormBlur : styles.forgotPasswordForm
        }
        onSubmit={handleSendOtp}
      >
        <h2 className={styles.title}>Quên Mật Khẩu</h2>

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

        <button
          type="submit"
          className={styles.resetPasswordButton}
          disabled={isLoading}
        >
          Gửi OTP đặt lại mật khẩu
        </button>

        <div className={styles.backToLogin}>
          <Link className={styles.backToLoginLink} to="/login">
            Quay Lại Đăng Nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
