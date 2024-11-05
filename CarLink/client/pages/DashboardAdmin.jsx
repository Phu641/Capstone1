import React, { useState, useEffect } from "react";
import "../styles/DashboardAdmin.css";
import RevenueChart from "../src/components/Chart/RevenueChart";
import UserList from "../src/components/UserList/UserList";

const DashboardAdmin = () => {
  const [showUserList, setShowUserList] = useState(false);
  const [showDashboard, setShowDashboard] = useState(true);
  const [activePage, setActivePage] = useState("dashboard");

  // State để lưu trữ dữ liệu từ API
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeCars: 0,
    totalRentals: 0,
    revenue: 0,
  });

  // Sử dụng useEffect để gọi API khi component được render
  useEffect(() => {
    // Hàm gọi API
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/"); api
        const data = await response.json();
        setStats(data); // Giả định rằng data chứa thông tin bạn cần
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchStats(); // Gọi hàm fetchStats để lấy dữ liệu
  }, []);

  const handleManageUsersClick = () => {
    setShowUserList(true);
    setShowDashboard(false);
    setActivePage("manageUsers");
  };

  const handleDashboardClick = () => {
    setShowDashboard(true);
    setShowUserList(false);
    setActivePage("dashboard");
  };

  return (
    <div className="dashboard-container">

      <div className="sidebar">
        <ul>
          <li 
            className={activePage === "dashboard" ? "active" : ""}
            onClick={handleDashboardClick}
          >
            Dashboard
          </li>
          <li 
            className={activePage === "manageUsers" ? "active" : ""}
            onClick={handleManageUsersClick}
          >
            Manage Users
          </li>
          <li 
            className={activePage === "vehicleApproval" ? "active" : ""}
          >
            Kiểm duyệt xe
          </li>
          <li 
            className={activePage === "bookingApproval" ? "active" : ""}
          >
            Kiểm duyệt Booking
          </li>
          <li 
            className={activePage === "customerFeedback" ? "active" : ""}
          >
            Phản hồi của khách hàng
          </li>
          <li 
            className={activePage === "settings" ? "active" : ""}
          >
            Cài đặt
          </li>
        </ul>
      </div>

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
                    <p>{stats.totalUsers}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Tổng xe đang hoạt động cho thuê</h3>
                    <p>{stats.activeCars}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Tổng lượt thuê</h3>
                    <p>{stats.totalRentals}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Doanh thu</h3>
                    <p>{stats.revenue} VND</p>
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
