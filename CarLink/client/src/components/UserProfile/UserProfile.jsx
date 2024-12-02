import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate(); 

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

  if (!userInfo) {
    return <div className="loading">Đang tải...</div>;
  }

  const maskedPassword =
    userInfo.password && userInfo.password.length > 6
      ? "******..."
      : "******";

  const handleEditClick = () => {
    navigate("/edit-profile"); 
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Thông tin cá nhân</h1>
      <div className="profile-card">
        <p>
          <strong>Tên:</strong> {userInfo.lastName} {userInfo.firstName}
        </p>
        <p>
          <strong>Email:</strong> {userInfo.email}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {userInfo.phone}
        </p>
        <p>
          <strong>Địa chỉ:</strong> {userInfo.address}
        </p>
        <p>
          <strong>Mật khẩu:</strong> {maskedPassword}
        </p>
        <button className="edit-button" onClick={handleEditClick}>
          Chỉnh sửa
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
