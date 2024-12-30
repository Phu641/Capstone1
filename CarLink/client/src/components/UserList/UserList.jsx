import React, { useEffect, useState } from "react";
import styles from "./UserList.module.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  // Hàm gọi API để lấy danh sách người dùng
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token từ localStorage:", token); // Log token để kiểm tra

        if (!token) {
          localStorage.clear();
          window.location.href = "/login";
          return;
        }

        const response = await fetch("http://localhost:3000/admin/all-users", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          if (response.status === 401) {
            localStorage.clear();
            window.location.href = "/login";
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchUsers();
  }, []);

  // Hàm xóa người dùng
  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa người dùng này?");
    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để thực hiện chức năng này");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(`http://localhost:3000/admin/user/${userId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Người dùng đã được xóa thành công");
        setUsers(users.filter(user => user.customerID !== userId));
      } else {
        console.error("Lỗi khi xóa người dùng, mã trạng thái:", response.status);
        if (response.status === 401) {
          alert("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  return (
    <div className={styles.userList}>
      <h2>Danh sách người dùng</h2>
      {users.length === 0 ? (
        <p>Không có người dùng nào để hiển thị.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Số CCCD</th>
              <th>Số điện thoại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.customerID}>
                <td>{user.customerID}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.idCard}</td>
                <td>{user.phone}</td>
                <td>
                  <button onClick={() => deleteUser(user.customerID)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "3px" }}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
