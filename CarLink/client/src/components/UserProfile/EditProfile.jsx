import React, { useEffect, useState } from "react";
import "./EditProfile.css";

const EditProfile = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/customer/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          throw new Error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/customer/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        alert("Cập nhật thông tin thành công!");
        window.location.href = "/profile";
      } else {
        throw new Error("Cập nhật thông tin thất bại");
      }
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Chỉnh sửa thông tin cá nhân</h1>
      <form className="edit-profile-form" onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="firstName">Tên:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Họ:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Số điện thoại:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Địa chỉ:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={userInfo.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group password-group">
          <label htmlFor="password">Mật khẩu:</label>
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"} 
              id="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Hiển thị hoặc ẩn mật khẩu"
            >
              {showPassword ? "👁️‍🗨️" : "🙈"}
            </button>
          </div>
        </div>
        <button type="submit" className="save-button">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
