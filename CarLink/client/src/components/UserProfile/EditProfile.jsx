import React, { useEffect, useState } from "react";
import "./EditProfile.css";

const EditProfile = () => {
  const [thongTinUser, setThongTinUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const layThongTinUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/customer/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setThongTinUser(data);
        } else {
          throw new Error("Lấy thông tin người dùng thất bại");
        }
      } catch (error) {
        console.error(error);
      }
    };

    layThongTinUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThongTinUser((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    const { customerID, idCard, salt, isVerified, OTP, otpExpiry, loyalPoint, createdAt, updatedAt, password, ...userToUpdate } = thongTinUser;
    
    if (!userToUpdate.firstName || !userToUpdate.lastName || !userToUpdate.email) {
        alert("Vui lòng điền đầy đủ thông tin quan trọng!");
        return;
    }
    
    userToUpdate.password = userToUpdate.password || 'default_password';  
  
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/customer/profile", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userToUpdate),
        });
  
        if (!response.ok) {
            const errorDetails = await response.json();
            console.error("Chi tiết lỗi từ API:", errorDetails); 
            throw new Error(`Lỗi HTTP! Mã trạng thái: ${response.status}`);
        }
  
        alert("Cập nhật thông tin thành công!");
        window.location.href = "/profile";
    } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        alert("Có lỗi xảy ra: " + error.message);
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
            value={thongTinUser.firstName}
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
            value={thongTinUser.lastName}
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
            value={thongTinUser.phone}
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
            value={thongTinUser.address}
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
            value={thongTinUser.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="save-button">
          Lưu
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
