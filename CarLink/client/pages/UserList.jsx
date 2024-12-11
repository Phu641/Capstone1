import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/UserList.module.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("manageUsers");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Bạn cần đăng nhập để truy cập thông tin người dùng");
          window.location.href = "/login";
          return;
        }

        const response = await fetch("http://localhost:3000/admin/all-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else if (response.status === 401) {
          alert("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Bạn cần đăng nhập để thực hiện chức năng này");
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `http://localhost:3000/admin/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Người dùng đã được xóa thành công");
        setUsers(users.filter((user) => user.customerID !== userId));
      } else if (response.status === 401) {
        alert("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  // Hàm điều hướng
  const handleDashboardClick = () => {
    navigate("/dashboardAdmin");
    setActivePage("dashboard");
  };

  const handleManageUsersClick = () => {
    navigate("/user-list");
    setActivePage("manageUsers");
  };

  const handleVehicleApprovalClick = () => {
    navigate("/vehicle-approval");
    setActivePage("vehicleApproval");
  };

  const handleOwnerReportsClick = () => {
    navigate("/owner-reports");
    setActivePage("ownerReports");
  };

  const handleReportHistoryClick = () => {
    navigate("/report-history");
    setActivePage("reportHistory");
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <ul>
          <li
            className={activePage === "DashboardAdmin" ? "active" : ""}
            onClick={handleDashboardClick}
          >
            Dashboard
          </li>
          <li
            className={activePage === "manageUsers" ? "active" : ""}
            onClick={handleManageUsersClick}
          >
            Quản lý người dùng
          </li>
          <li
            className={activePage === "vehicleApproval" ? "active" : ""}
            onClick={handleVehicleApprovalClick}
          >
            Kiểm duyệt xe
          </li>
          <li className={activePage === "bookingApproval" ? "active" : ""}>
            Kiểm duyệt Booking
          </li>
          <li className={activePage === "customerFeedback" ? "active" : ""}>
            Phản hồi của khách hàng
          </li>
          <li
            className={activePage === "ownerReports" ? "active" : ""}
            onClick={handleOwnerReportsClick}
          >
            Báo cáo của chủ xe
          </li>
          <li
            className={activePage === "reportHistory" ? "active" : ""}
            onClick={handleReportHistoryClick}
          >
            Lịch sử báo cáo
          </li>
          <li className={activePage === "settings" ? "active" : ""}>Cài đặt</li>
        </ul>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.userList}>
          <h2>Danh sách người dùng</h2>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                padding: "10px",
                width: "100%",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {filteredUsers.length === 0 ? (
            <p>Không tìm thấy người dùng phù hợp.</p>
          ) : (
            <table className={styles.userListTable}>
              <thead>
                <tr className={styles.userListTheadTr}>
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
                {filteredUsers.map((user) => (
                  <tr key={user.customerID} className={styles.userListTbodyTr}>
                    <td>{user.customerID}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.idCard}</td>
                    <td>{user.phone}</td>
                    <td>
                      <button
                        onClick={() => deleteUser(user.customerID)}
                        style={{
                          padding: "5px 10px",
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          border: "none",
                          borderRadius: "3px",
                          cursor: "pointer",
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserList;
