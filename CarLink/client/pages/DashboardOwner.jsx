import React, { useState } from "react";

// Component DashboardOwner
const DashboardOwner = () => {
  // Khai báo state để quản lý hiển thị của các thành phần trong dashboard
  const [activePage, setActivePage] = useState("DashboardOwner");

  // Khai báo state để lưu dữ liệu từ API
  const [stats, setStats] = useState({
    totalCarOwner: 0,
    totalRentalsOwner: 0,
    revenueOwner: 0,
    balanceOwner: 0,
  });

  // Hàm xử lý khi nhấn nút "Dashboard"
  const handleDashboardClick = () => {
    setActivePage("dashboard");
  };

  // Hàm xử lý khi nhấn nút "Quản lý xe"
  const handleManageVehiclesClick = () => {
    setActivePage("manageVehicles");
  };

  // Hàm xử lý khi nhấn nút "Yêu cầu thuê xe"
  const handleRentalRequestsClick = () => {
    setActivePage("rentalRequests");
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
            className={activePage === "manageVehicles" ? "active" : ""}
            onClick={handleManageVehiclesClick}
          >
            Quản lý xe
          </li>
          <li
            className={activePage === "rentalRequests" ? "active" : ""}
            onClick={handleRentalRequestsClick}
          >
            Yêu cầu thuê xe
          </li>
        </ul>
      </div>

      <div className="main-content">
        {activePage === "dashboard" && (
          <>
            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Tổng số xe đang cho thuê trên CarLink</h3>
                <p>{stats.totalCarOwner}</p>
              </div>
              <div className="stat-card">
                <h3>Tổng số lượt thuê tháng này</h3>
                <p>{stats.totalRentalsOwner}</p>
              </div>
              <div className="stat-card">
                <h3>Doanh thu tháng</h3>
                <p>{stats.revenueOwner} VND</p>
              </div>
              <div className="stat-card">
                <h3>Số dư trong ví</h3>
                <p>{stats.balanceOwner} VND</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOwner;
