import React, { useEffect, useState } from "react";
import styles from "./UserList.module.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Hàm gọi API để lấy danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(""); // Thay 'API_ENDPOINT' bằng URL của API
        const data = await response.json();
        setUsers(data); // Cập nhật dữ liệu từ API vào state
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.userList}>
      <h2>Danh sách người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Số CCCD</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
              <td>{user.cccd}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
