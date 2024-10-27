import React, { useState } from "react";
import "../styles/DashboardAdmin.css";
import RevenueChart from "../src/components/Chart/RevenueChart";
import UserList from "../src/components/UserList/UserList";

const DashboardAdmin = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true); // Thêm state để hiển thị biểu đồ

  const handleManageUsersClick = () => {
    setShowUserList(true); // Bật trạng thái để hiển thị bảng UserList
    setShowDashboard(false); // Tắt trạng thái biểu đồ
  };

  const handleDashboardClick = () => {
    setShowDashboard(true); // Bật trạng thái để hiển thị biểu đồ
    setShowUserList(false); // Tắt trạng thái bảng UserList
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={handleDashboardClick}>Dashboard</li> {/* Nhấn vào để về trang Dashboard */}
          <li onClick={handleManageUsersClick}>Manage Users</li>
          <li>Manage Cars</li>
          <li>Kiểm duyệt xe</li>
          <li>Kiểm duyệt Booking</li>
          <li>Phản hồi của khách hàng</li>
          <li>Cài đặt</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {showUserList ? (
          <UserList />
        ) : (
          <>
            {showDashboard && (
              <>
                <header className="dashboard-header"></header>

                <div className="dashboard-stats">
                  <div className="stat-card">
                    <h3>Tổng người dùng trên hệ thống</h3>
                    <p>120</p>
                  </div>
                  <div className="stat-card">
                    <h3>Tổng xe đang hoạt động cho thuê</h3>
                    <p>50</p>
                  </div>
                  <div className="stat-card">
                    <h3>Tổng lượt thuê</h3>
                    <p>300</p>
                  </div>
                  <div className="stat-card">
                    <h3>Doanh thu</h3>
                    <p>450,000,000 VND</p>
                  </div>
                </div>

                {/* Biểu đồ doanh thu */}
                <div className="chart-container">
                  <RevenueChart />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
